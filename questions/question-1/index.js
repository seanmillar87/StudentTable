// With the data provided create a new array of objects which only 
// contains the fields Date, Uniques & Total Sessions.

const dailyBreakdown = [
  {
      "date": "2018-06-01T00:00:00",
      "uniques": 2100000,
      "synced": 650000,
      "interests": 1360000,
      "dnt": 100000,
      "iOS": 500000,
      "thirdPartyCookie": 600000,
      "totalSessions": 2501000,
      "totalPageViews": 5057800,
  },
  {
      "date": "2018-06-02T00:00:00",
      "uniques": 2500000,
      "synced": 450000,
      "interests": 1300000,
      "dnt": 200000,
      "iOS": 600000,
      "thirdPartyCookie": 700000,
      "totalSessions": 2600000,
      "totalPageViews": 5060000,
  },
  {
      "date": "2018-06-03T00:00:00",
      "uniques": 1500000,
      "synced": 100000,
      "interests": 1500000,
      "dnt": 150000,
      "iOS": 750000,
      "thirdPartyCookie": 230000,
      "totalSessions": 1500000,
      "totalPageViews": 10005800,
  }
];

mappedBreakdown = (breakdown) => {
  
  return breakdown.map(item => {
    const container = {};    
    
    container.date = item.date;
    container.uniques = item.uniques;
    container.totalSessions = item.totalSessions;
    
    return container;
  });
}

console.log(mappedBreakdown(dailyBreakdown));