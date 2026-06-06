const start = performance.now();
fetch('http://localhost:8000/api/layanan').then(res => res.json()).then(data => {
  const end = performance.now();
  console.log(`Fetch localhost took ${end - start} ms`, data.length, 'items');
}).catch(console.error);
