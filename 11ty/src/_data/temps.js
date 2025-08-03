// module.exports = async function() {
//     const res = await fetch("https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&hourly=temperature_2m");
  
//     if (!res.ok) {
//       throw new Error(`Failed to fetch temps: ${res.status}`);
//     }
  
//     return await res.json();
//   };
  

// Create a page called Temps in the pages folder
// ---
// pagination:
//   data: temps.hourly.time
//   size: 1
//   alias: temp
//   addAllPagesToCollections: temp
// permalink: "/temp/{{ temp | slug }}/"
// layout: layout.njk
// ---

// <h1>{{ temp }}</h1> 