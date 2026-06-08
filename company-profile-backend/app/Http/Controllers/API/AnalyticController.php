<?php

namespace App\Http\Controllers\API;

use Illuminate\Routing\Controller;
use App\Models\Analytic;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class AnalyticController extends Controller
{
    /**
     * Store a new analytic event.
     */
    public function store(Request $request)
    {
        $request->validate([
            'type' => 'required|string|in:website_visit,product_view,shopee_click',
            'layanan_id' => 'nullable|exists:layanans,id'
        ]);

        Analytic::create([
            'type' => $request->type,
            'layanan_id' => $request->layanan_id,
            'ip_address' => $request->ip(),
            'user_agent' => $request->userAgent()
        ]);

        return response()->json(['message' => 'Analytic recorded successfully'], 201);
    }

    /**
     * Get aggregated analytics stats for the admin dashboard.
     */
    public function stats(Request $request)
    {
        $period = $request->query('period', 'weekly'); // weekly, monthly, yearly
        
        $startDate = now();
        $groupBy = "DATE(created_at)";
        $dateFormat = "Y-m-d";

        if ($period === 'yearly') {
            $startDate = now()->subMonths(11)->startOfMonth();
            $groupBy = "DATE_FORMAT(created_at, '%Y-%m')";
        } elseif ($period === 'monthly') {
            $startDate = now()->subDays(29)->startOfDay();
        } else { // weekly
            $startDate = now()->subDays(6)->startOfDay();
        }

        // 1. Total Website Visits
        $totalVisits = Analytic::where('type', 'website_visit')->count();

        // 1b. Website Visits Time Series
        $visitsSeriesQuery = Analytic::select(DB::raw("$groupBy as label"), DB::raw('count(*) as total'))
            ->where('type', 'website_visit')
            ->where('created_at', '>=', $startDate)
            ->groupBy('label')
            ->orderBy('label', 'asc')
            ->get();

        // 2. Product Views grouped by layanan_id
        $productViews = Analytic::select('layanan_id', DB::raw('count(*) as total'))
            ->where('type', 'product_view')
            ->whereNotNull('layanan_id')
            ->groupBy('layanan_id')
            ->get();

        // 3. Shopee Clicks grouped by layanan_id
        $shopeeClicks = Analytic::select('layanan_id', DB::raw('count(*) as total'))
            ->where('type', 'shopee_click')
            ->whereNotNull('layanan_id')
            ->groupBy('layanan_id')
            ->get();

        return response()->json([
            'total_visits' => $totalVisits,
            'visits_series' => $visitsSeriesQuery,
            'product_views' => $productViews,
            'shopee_clicks' => $shopeeClicks
        ]);
    }
}
