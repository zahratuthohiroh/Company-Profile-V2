const start = performance.now();
fetch('http://127.0.0.1:8000/api/layanan').then(res => res.json()).then(data => {
  const end = performance.now();
  console.log(`Fetch took ${end - start} ms`, data.length, 'items');
}).catch(console.error);
