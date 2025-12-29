module.exports = {
  up: async (queryInterface) => {

    // Delivery Zones
    await queryInterface.bulkInsert("DeliveryZones", [
      {
        id: 1,
        name: "URBAN",
        baseDeliveryFee: 25,
        perKilometerRate: 2.5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        name: "SUBURBAN",
        baseDeliveryFee: 35,
        perKilometerRate: 3.2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 3,
        name: "REMOTE",
        baseDeliveryFee: 50,
        perKilometerRate: 4.5,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);

    // Promotions (FIXED)
    await queryInterface.bulkInsert("Promotions", [
      {
        id: 1,
        promotionType: "FIRST_ORDER",
        configuration: JSON.stringify({ discountPercentage: 10 }),
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);

    // Peak Rules
    // await queryInterface.bulkInsert("PeakRules", [
    //   {
    //     id: 1,
    //     startHour: 19,
    //     endHour: 22,
    //     multiplier: 1.3,
    //     createdAt: new Date(),
    //     updatedAt: new Date()
    //   }
    // ]);

    await queryInterface.bulkInsert("PeakRules", [
      {
        id: 1,
        startHour: 19,
        endHour: 22,
        multiplier: 1.3,
        appliesOnWeekends: false,
        holidayDates: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        startHour: 0,
        endHour: 23,
        multiplier: 1.2,
        appliesOnWeekends: true,
        holidayDates: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 3,
        startHour: 0,
        endHour: 23,
        multiplier: 1.5,
        appliesOnWeekends: false,
        holidayDates: JSON.stringify(["2025-01-01", "2025-12-25"]),
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
    

    // Restaurants
    await queryInterface.bulkInsert("Restaurants", [
      {
        id: 1,
        name: "Central City Restaurant",
        latitude: 12.9716,
        longitude: 77.5946,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);

    // Items
    await queryInterface.bulkInsert("Items", [
      {
        id: 1,
        name: "Veg Burger",
        price: 120,
        restaurantId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        name: "French Fries",
        price: 80,
        restaurantId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);

    // Customers
    await queryInterface.bulkInsert("Customers", [
      {
        id: 1,
        name: "Urban Customer (Near)",
        latitude: 12.9721,
        longitude: 77.5933,
        deliveryZoneId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        name: "Suburban Customer (Medium Distance)",
        latitude: 12.9066,
        longitude: 77.6010,
        deliveryZoneId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 3,
        name: "Remote Customer (Worst Case)",
        latitude: 13.1986,
        longitude: 77.7066,
        deliveryZoneId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete("Customers", null, {});
    await queryInterface.bulkDelete("Items", null, {});
    await queryInterface.bulkDelete("Restaurants", null, {});
    await queryInterface.bulkDelete("PeakRules", null, {});
    await queryInterface.bulkDelete("Promotions", null, {});
    await queryInterface.bulkDelete("DeliveryZones", null, {});
  }
};
