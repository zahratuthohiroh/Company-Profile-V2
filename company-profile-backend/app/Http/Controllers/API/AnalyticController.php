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
    public function stats()
    {
        // 1. Total Website Visits
        $totalVisits = Analytic::where('type', 'website_visit')->count();

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
            'product_views' => $productViews,
            'shopee_clicks' => $shopeeClicks
        ]);
    }
}
