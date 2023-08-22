const lunetAccountTransform = (data) => {
  const transformed = data.slice(2).map((entry) => {
    return {
      Account: entry.A,
      AccountName: entry.B,
      TotalRevenue: entry.C,
      RoomRevenuee: entry.D,
      ADR: entry.E,
      RoomRevenue: {
        FIT: entry.F,
        Group: entry.G,
      },
      Rooms: {
        Nights: entry.H,
        NoShow: entry.I,
        Cancel: entry.J,
        Booking: entry.K,
      },
      Guests: entry.L,
      Food: entry.M,
      Beverage: entry.N,
      Other: entry.O,
      SVC: entry.P,
      Tax: entry.Q,
    };
  });
  return transformed;
};

export default lunetAccountTransform;
