const vehicles = [
    {
      name: 'Tesla Model 3',
      type: 'Car',
      images: ['https://images.unsplash.com/photo-1560958089-b8a1929cea89?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'],
      pricePerDay: 15000,
      rating: 4.8,
      numReviews: 12,
      description: 'Experience the future of driving with the Tesla Model 3. Autopilot, electric performance, and minimalist design.',
      isAvailable: true,
      address: '123 Tech Blvd, Silicon Valley, CA',
      pickupLocation: { lat: 37.7749, lng: -122.4194 }
    },
    {
      name: 'Yamaha R15',
      type: 'Bike',
      images: ['https://images.unsplash.com/photo-1558981403-c5f9899a28bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'],
      pricePerDay: 4500,
      rating: 4.6,
      numReviews: 8,
      description: 'A sportbike that offers racetrack performance for the street. Agile, fast, and aggressively styled.',
      transmission: 'Manual',
      capacity: '2 Persons',
      isAvailable: true,
      address: '45 Moto Lane, Austin, TX',
      pickupLocation: { lat: 30.2672, lng: -97.7431 }
    },
      {
      name: 'BMW M4',
      type: 'Car',
      images: ['https://images.unsplash.com/photo-1617788138017-80ad40651399?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'],
      pricePerDay: 20000,
      rating: 4.9,
      numReviews: 25,
      description: 'The ultimate driving machine. The BMW M4 combines luxury with raw power.',
      isAvailable: true,
      address: '789 Luxury Ave, Miami, FL',
      pickupLocation: { lat: 25.7617, lng: -80.1918 }
    },
    {
      name: 'Royal Enfield Classic 350',
      type: 'Bike',
      images: ['https://images.unsplash.com/photo-1623080064243-7f2122fc751a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'],
      pricePerDay: 3000,
      rating: 4.7,
      numReviews: 40,
      description: 'A timeless classic. Perfect for leisurely rides and enjoying the thump of the engine.',
      transmission: 'Manual',
      capacity: '2 Persons',
      isAvailable: true,
      address: '101 Heritage Rd, New Delhi, India',
      pickupLocation: { lat: 28.6139, lng: 77.2090 }
    },
      {
      name: 'Harley Davidson Iron 883',
      type: 'Bike',
      images: ['https://images.unsplash.com/photo-1558981806-ec527fa84c3d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'],
      pricePerDay: 8000,
      rating: 4.9,
      numReviews: 15,
      description: 'Raw, striped-down, and aggressive. The Iron 883 is the original icon of the Dark Custom style.',
      transmission: 'Manual',
      capacity: '1 Person',
      isAvailable: true,
      address: '66 Route, Chicago, IL',
      pickupLocation: { lat: 41.8781, lng: -87.6298 }
    },
      {
      name: 'Mercedes C-Class',
      type: 'Car',
      images: ['https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'],
      pricePerDay: 18000,
      rating: 4.8,
      numReviews: 18,
      description: 'Elegant, comfortable, and sophisticated. The C-Class defines the modern luxury sedan.',
      isAvailable: false,
      address: '999 Elite St, New York, NY',
      pickupLocation: { lat: 40.7128, lng: -74.0060 }
    }
  ];
  
  module.exports = vehicles;
