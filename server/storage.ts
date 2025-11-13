import { type Property, type InsertProperty, type PropertyFilter } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // Property methods
  getProperties(filter?: PropertyFilter): Promise<Property[]>;
  getProperty(id: string): Promise<Property | undefined>;
  createProperty(property: InsertProperty): Promise<Property>;
  incrementPropertyViews(id: string): Promise<void>;
}

export class MemStorage implements IStorage {
  private properties: Map<string, Property>;

  constructor() {
    this.properties = new Map();
    this.initializeSampleData();
  }

  private initializeSampleData() {
    const sampleProperties: InsertProperty[] = [
      // Land Plots
      {
        type: "land",
        title: "Prime Agricultural Land Near Cheyyar",
        description: "Excellent agricultural land with rich soil, perfect for farming and cultivation. Located in a peaceful area with easy access to main road. Water source available. Clear title and ready for immediate purchase. Ideal for organic farming or traditional crops.",
        price: 2500000,
        priceType: "sale",
        sizeValue: 2.5,
        sizeUnit: "acres",
        address: "Vengikkal Village Road, Near Bypass",
        city: "Cheyyar",
        state: "TN",
        latitude: 12.6589,
        longitude: 79.5432,
        images: [
          "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80",
          "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800&q=80",
          "https://images.unsplash.com/photo-1560493676-04071c5f467b?w=800&q=80",
          "https://images.unsplash.com/photo-1625246376548-8a6e55efb5ec?w=800&q=80"
        ],
        features: ["Fertile Soil", "Water Access", "Road Frontage", "Clear Title", "Fenced"],
        status: "available",
        contactName: "Rajesh Kumar",
        contactPhone: "+91 98765 43210",
      },
      {
        type: "land",
        title: "Residential Plot in Developing Area",
        description: "Well-located residential plot in a rapidly developing neighborhood. Perfect for building your dream home. Electricity and water connections available. Wide road access and surrounded by modern houses. Great investment opportunity with high appreciation potential.",
        price: 1800000,
        priceType: "sale",
        sizeValue: 1200,
        sizeUnit: "sqft",
        address: "Gandhi Nagar, 2nd Cross Street",
        city: "Cheyyar",
        state: "TN",
        latitude: 12.6612,
        longitude: 79.5389,
        images: [
          "https://images.unsplash.com/photo-1513584684374-8bab748fbf90?w=800&q=80",
          "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80",
          "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800&q=80",
          "https://images.unsplash.com/photo-1523217582562-09d0def993a6?w=800&q=80"
        ],
        features: ["Electricity Available", "Water Connection", "Wide Road", "Residential Zone", "DTCP Approved"],
        status: "available",
        contactName: "Meena Devi",
        contactPhone: "+91 99876 54321",
      },
      {
        type: "land",
        title: "5 Acres Farmland with Bore Well",
        description: "Spacious farmland ideal for agriculture with an existing bore well providing ample water supply. Rich red soil suitable for multiple crops. Peaceful location away from city noise. Power connection available. Perfect for serious farmers or agricultural projects.",
        price: 5000000,
        priceType: "sale",
        sizeValue: 5,
        sizeUnit: "acres",
        address: "Melrosapuram Village, Near Temple",
        city: "Cheyyar",
        state: "TN",
        latitude: 12.6701,
        longitude: 79.5512,
        images: [
          "https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=800&q=80",
          "https://images.unsplash.com/photo-1605000797499-95a51c5269ae?w=800&q=80",
          "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800&q=80",
          "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=800&q=80"
        ],
        features: ["Bore Well", "Power Connection", "Red Soil", "Peaceful Location", "Good Drainage"],
        status: "available",
        contactName: "Subramaniam",
        contactPhone: "+91 97654 32109",
      },
      {
        type: "land",
        title: "Corner Plot Near Main Road",
        description: "Premium corner plot with excellent visibility and accessibility. Suitable for commercial or residential use. All amenities nearby including schools, hospitals, and markets. Rapid development in the area. Great for building a home or small business.",
        price: 3200000,
        priceType: "sale",
        sizeValue: 1800,
        sizeUnit: "sqft",
        address: "Main Road Junction, Arani Highway",
        city: "Cheyyar",
        state: "TN",
        latitude: 12.6578,
        longitude: 79.5401,
        images: [
          "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80",
          "https://images.unsplash.com/photo-1516156008625-3a9d6067fab5?w=800&q=80",
          "https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=800&q=80",
          "https://images.unsplash.com/photo-1448630360428-65456885c650?w=800&q=80"
        ],
        features: ["Corner Plot", "Main Road Access", "All Amenities Nearby", "Commercial Potential", "Level Ground"],
        status: "available",
        contactName: "Lakshmi Narayanan",
        contactPhone: "+91 96543 21098",
      },
      {
        type: "land",
        title: "Agricultural Land with Coconut Grove",
        description: "Productive agricultural land with established coconut plantation. Generating steady income from coconut harvest. Includes small farm house and storage shed. Regular water supply from nearby canal. Perfect for someone looking for an income-generating property.",
        price: 4500000,
        priceType: "sale",
        sizeValue: 3.5,
        sizeUnit: "acres",
        address: "Periyakulam Road, Near Canal",
        city: "Cheyyar",
        state: "TN",
        latitude: 12.6523,
        longitude: 79.5478,
        images: [
          "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
          "https://images.unsplash.com/photo-1587293852726-70cdb56c2866?w=800&q=80",
          "https://images.unsplash.com/photo-1598512329080-16fc8f9f5a0e?w=800&q=80",
          "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=800&q=80"
        ],
        features: ["Coconut Plantation", "Farm House", "Storage Shed", "Canal Water", "Income Generating"],
        status: "available",
        contactName: "Venkatesh",
        contactPhone: "+91 95432 10987",
      },

      // Rental Properties
      {
        type: "rental",
        title: "Spacious 2BHK House for Rent",
        description: "Well-maintained independent house with 2 bedrooms and 2 bathrooms. Fully furnished with modern amenities. Quiet residential neighborhood with parking facility. Close to schools, markets, and bus stand. Suitable for small families.",
        price: 8000,
        priceType: "rent_monthly",
        sizeValue: 900,
        sizeUnit: "sqft",
        address: "Nehru Street, Central Cheyyar",
        city: "Cheyyar",
        state: "TN",
        latitude: 12.6598,
        longitude: 79.5423,
        images: [
          "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&q=80",
          "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
          "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
          "https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?w=800&q=80"
        ],
        features: ["Fully Furnished", "Parking Available", "24/7 Water Supply", "Power Backup", "Safe Neighborhood"],
        bedrooms: 2,
        bathrooms: 2,
        status: "available",
        contactName: "Priya Sharma",
        contactPhone: "+91 94321 09876",
      },
      {
        type: "rental",
        title: "Modern 3BHK Apartment",
        description: "Luxurious 3 bedroom apartment in a gated community. Premium fittings and fixtures. Clubhouse, gym, and children's play area. Covered parking and security services. Excellent ventilation and natural lighting. Perfect for families looking for comfortable living.",
        price: 15000,
        priceType: "rent_monthly",
        sizeValue: 1400,
        sizeUnit: "sqft",
        address: "Lake View Apartments, Bypass Road",
        city: "Cheyyar",
        state: "TN",
        latitude: 12.6645,
        longitude: 79.5356,
        images: [
          "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80",
          "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80",
          "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800&q=80",
          "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&q=80"
        ],
        features: ["Gated Community", "Clubhouse", "Gym", "Security", "Covered Parking", "Play Area"],
        bedrooms: 3,
        bathrooms: 2,
        status: "available",
        contactName: "Arun Patel",
        contactPhone: "+91 93210 98765",
      },
      {
        type: "rental",
        title: "Affordable 1BHK for Single/Couple",
        description: "Cozy 1 bedroom apartment perfect for singles or couples. Semi-furnished with basic amenities. Good connectivity to main areas. Safe and peaceful locality. Regular water supply and power backup. Budget-friendly option in prime location.",
        price: 5000,
        priceType: "rent_monthly",
        sizeValue: 550,
        sizeUnit: "sqft",
        address: "Anna Nagar, 4th Street",
        city: "Cheyyar",
        state: "TN",
        latitude: 12.6621,
        longitude: 79.5445,
        images: [
          "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80",
          "https://images.unsplash.com/photo-1554995207-c18c203602cb?w=800&q=80",
          "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
          "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&q=80"
        ],
        features: ["Semi-Furnished", "Water Supply", "Power Backup", "Good Connectivity", "Safe Area"],
        bedrooms: 1,
        bathrooms: 1,
        status: "available",
        contactName: "Divya Krishnan",
        contactPhone: "+91 92109 87654",
      },
      {
        type: "rental",
        title: "Family Home with Garden",
        description: "Beautiful independent house with spacious rooms and a lovely garden. Traditional architecture with modern amenities. Large kitchen and dining area. Separate servant quarters. Peaceful environment ideal for families. Pet-friendly property.",
        price: 18000,
        priceType: "rent_monthly",
        sizeValue: 1800,
        sizeUnit: "sqft",
        address: "Gandhi Road, Green Park Colony",
        city: "Cheyyar",
        state: "TN",
        latitude: 12.6567,
        longitude: 79.5467,
        images: [
          "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80",
          "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
          "https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=800&q=80",
          "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&q=80"
        ],
        features: ["Garden", "Pet Friendly", "Servant Quarters", "Traditional Design", "Spacious Rooms"],
        bedrooms: 4,
        bathrooms: 3,
        status: "available",
        contactName: "Karthik Raman",
        contactPhone: "+91 91098 76543",
      },
      {
        type: "rental",
        title: "Budget Studio Apartment",
        description: "Compact and efficient studio apartment perfect for students or working professionals. Includes basic furniture and kitchen setup. Located near educational institutions and IT parks. Public transport readily available. Affordable monthly rent with flexible lease terms.",
        price: 4000,
        priceType: "rent_monthly",
        sizeValue: 400,
        sizeUnit: "sqft",
        address: "College Road, Near Bus Stand",
        city: "Cheyyar",
        state: "TN",
        latitude: 12.6634,
        longitude: 79.5412,
        images: [
          "https://images.unsplash.com/photo-1560184897-ae75f418493e?w=800&q=80",
          "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800&q=80",
          "https://images.unsplash.com/photo-1536376072261-38c75010e6c9?w=800&q=80",
          "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=800&q=80"
        ],
        features: ["Furnished", "Near College", "Public Transport", "WiFi Ready", "Flexible Lease"],
        bedrooms: 1,
        bathrooms: 1,
        status: "available",
        contactName: "Anitha Sundaram",
        contactPhone: "+91 90987 65432",
      },
      {
        type: "rental",
        title: "Luxury 3BHK Penthouse",
        description: "Premium penthouse with stunning views and top-of-the-line amenities. Modular kitchen with imported fittings. Private terrace garden. Covered parking for 2 vehicles. Swimming pool and gym access. Perfect for those seeking luxury living.",
        price: 25000,
        priceType: "rent_monthly",
        sizeValue: 2000,
        sizeUnit: "sqft",
        address: "Sky Heights, Bypass Road",
        city: "Cheyyar",
        state: "TN",
        latitude: 12.6656,
        longitude: 79.5378,
        images: [
          "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80",
          "https://images.unsplash.com/photo-1600585154363-67eb9e2e2099?w=800&q=80",
          "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80",
          "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80"
        ],
        features: ["Penthouse", "Terrace Garden", "Swimming Pool", "Modular Kitchen", "Premium Fittings", "2 Parking"],
        bedrooms: 3,
        bathrooms: 3,
        status: "available",
        contactName: "Vijay Kumar",
        contactPhone: "+91 89876 54321",
      },

      // Retail Spaces
      {
        type: "retail",
        title: "Prime Retail Space on Main Road",
        description: "Excellent commercial space in high-traffic location. Ground floor with large display windows. Perfect for retail showroom, boutique, or restaurant. Ample parking space available. Well-maintained building with modern amenities. Great visibility from main road.",
        price: 45000,
        priceType: "rent_monthly",
        sizeValue: 1200,
        sizeUnit: "sqft",
        address: "Main Bazaar Road, Central Market",
        city: "Cheyyar",
        state: "TN",
        latitude: 12.6601,
        longitude: 79.5418,
        images: [
          "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=800&q=80",
          "https://images.unsplash.com/photo-1567696911980-2eed69a46042?w=800&q=80",
          "https://images.unsplash.com/photo-1528698827591-e19ccd7bc23d?w=800&q=80",
          "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=800&q=80"
        ],
        features: ["Main Road Location", "Display Windows", "Parking Available", "High Traffic", "Modern Building"],
        status: "available",
        contactName: "Ganesh Traders",
        contactPhone: "+91 88765 43210",
      },
      {
        type: "retail",
        title: "Commercial Building for Sale",
        description: "3-story commercial building suitable for offices, showrooms, or educational institution. Each floor approximately 2000 sqft. Elevator installed. Ample parking space. Located in commercial zone with good connectivity. Excellent investment opportunity with high rental potential.",
        price: 15000000,
        priceType: "sale",
        sizeValue: 6000,
        sizeUnit: "sqft",
        address: "Commercial Complex, Arani Road",
        city: "Cheyyar",
        state: "TN",
        latitude: 12.6589,
        longitude: 79.5398,
        images: [
          "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80",
          "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80",
          "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&q=80",
          "https://images.unsplash.com/photo-1497215842964-222b430dc094?w=800&q=80"
        ],
        features: ["3 Floors", "Elevator", "Parking Space", "Commercial Zone", "Investment Opportunity"],
        status: "available",
        contactName: "Murugan Enterprises",
        contactPhone: "+91 87654 32109",
      },
      {
        type: "retail",
        title: "Shop Space in Shopping Complex",
        description: "Modern shop in newly constructed shopping complex. Ready to move in with basic electrical and plumbing. Central air conditioning. Ideal for clothing store, electronics shop, or food outlet. Part of established retail hub with good footfall.",
        price: 20000,
        priceType: "rent_monthly",
        sizeValue: 600,
        sizeUnit: "sqft",
        address: "City Centre Mall, Gandhi Nagar",
        city: "Cheyyar",
        state: "TN",
        latitude: 12.6623,
        longitude: 79.5434,
        images: [
          "https://images.unsplash.com/photo-1555529902-5261145633bf?w=800&q=80",
          "https://images.unsplash.com/photo-1567696911980-2eed69a46042?w=800&q=80",
          "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=800&q=80",
          "https://images.unsplash.com/photo-1567696911980-2eed69a46042?w=800&q=80"
        ],
        features: ["Shopping Complex", "Central AC", "Ready to Move", "Good Footfall", "Modern Amenities"],
        status: "available",
        contactName: "Balaji Properties",
        contactPhone: "+91 86543 21098",
      },
      {
        type: "retail",
        title: "Office Space for IT/BPO",
        description: "Spacious office space suitable for IT companies or BPO operations. Multiple cabins and workstations. Conference room and pantry area. High-speed internet connectivity. Ample parking for employees. Located in IT corridor with easy access to transport.",
        price: 35000,
        priceType: "rent_monthly",
        sizeValue: 2500,
        sizeUnit: "sqft",
        address: "Tech Park, Bypass Road",
        city: "Cheyyar",
        state: "TN",
        latitude: 12.6667,
        longitude: 79.5367,
        images: [
          "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80",
          "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800&q=80",
          "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&q=80",
          "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80"
        ],
        features: ["IT Ready", "Conference Room", "Pantry", "High Speed Internet", "Employee Parking"],
        status: "available",
        contactName: "Sridevi Realty",
        contactPhone: "+91 85432 10987",
      },
      {
        type: "retail",
        title: "Restaurant Space with Kitchen",
        description: "Fully equipped restaurant space with commercial kitchen setup. Seating capacity for 50 people. Existing exhaust system and gas connections. Strategically located near bus stand and market area. Previous tenant's fixtures can be negotiated.",
        price: 40000,
        priceType: "rent_monthly",
        sizeValue: 1500,
        sizeUnit: "sqft",
        address: "Station Road, Near Bus Stand",
        city: "Cheyyar",
        state: "TN",
        latitude: 12.6612,
        longitude: 79.5401,
        images: [
          "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=80",
          "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",
          "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=800&q=80",
          "https://images.unsplash.com/photo-1590846406792-0adc7f938f1d?w=800&q=80"
        ],
        features: ["Commercial Kitchen", "50 Seating", "Exhaust System", "Gas Connection", "Strategic Location"],
        status: "available",
        contactName: "Natarajan & Sons",
        contactPhone: "+91 84321 09876",
      },
      {
        type: "retail",
        title: "Medical Clinic Space",
        description: "Professional space ideal for medical clinic or diagnostic center. Multiple consultation rooms and waiting area. Separate laboratory space. Good accessibility with ramp for differently-abled. Located in healthcare hub with pharmacy and hospitals nearby.",
        price: 30000,
        priceType: "rent_monthly",
        sizeValue: 1800,
        sizeUnit: "sqft",
        address: "Hospital Road, Medical District",
        city: "Cheyyar",
        state: "TN",
        latitude: 12.6578,
        longitude: 79.5456,
        images: [
          "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&q=80",
          "https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=800&q=80",
          "https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?w=800&q=80",
          "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&q=80"
        ],
        features: ["Consultation Rooms", "Laboratory Space", "Ramp Access", "Healthcare Hub", "Waiting Area"],
        status: "available",
        contactName: "Selvam Commercial",
        contactPhone: "+91 83210 98765",
      },
      {
        type: "retail",
        title: "Corner Shop with Residence",
        description: "Unique commercial property with shop on ground floor and 2BHK residence on first floor. Perfect for business owners who want to live above their shop. Corner location with excellent visibility. Suitable for grocery store, pharmacy, or retail business.",
        price: 8500000,
        priceType: "sale",
        sizeValue: 2200,
        sizeUnit: "sqft",
        address: "Market Street Corner, Town Center",
        city: "Cheyyar",
        state: "TN",
        latitude: 12.6595,
        longitude: 79.5429,
        images: [
          "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=800&q=80",
          "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80",
          "https://images.unsplash.com/photo-1528698827591-e19ccd7bc23d?w=800&q=80",
          "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=800&q=80"
        ],
        features: ["Shop + Residence", "Corner Location", "High Visibility", "Live-Work Space", "Town Center"],
        status: "available",
        contactName: "Krishna Real Estate",
        contactPhone: "+91 82109 87654",
      },
    ];

    sampleProperties.forEach(prop => {
      const id = randomUUID();
      const property: Property = {
        ...prop,
        id,
        bedrooms: prop.bedrooms ?? null,
        bathrooms: prop.bathrooms ?? null,
        status: prop.status ?? "available",
        city: prop.city ?? "Cheyyar",
        state: prop.state ?? "TN",
        dateListed: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000),
        views: Math.floor(Math.random() * 200),
      };
      this.properties.set(id, property);
    });
  }

  async getProperties(filter?: PropertyFilter): Promise<Property[]> {
    let properties = Array.from(this.properties.values());

    if (!filter) {
      return properties.sort((a, b) => new Date(b.dateListed).getTime() - new Date(a.dateListed).getTime());
    }

    // Apply filters
    if (filter.type) {
      properties = properties.filter(p => p.type === filter.type);
    }

    if (filter.status) {
      properties = properties.filter(p => p.status === filter.status);
    }

    if (filter.minPrice !== undefined) {
      properties = properties.filter(p => p.price >= filter.minPrice!);
    }

    if (filter.maxPrice !== undefined) {
      properties = properties.filter(p => p.price <= filter.maxPrice!);
    }

    if (filter.minSize !== undefined) {
      properties = properties.filter(p => p.sizeValue >= filter.minSize!);
    }

    if (filter.maxSize !== undefined) {
      properties = properties.filter(p => p.sizeValue <= filter.maxSize!);
    }

    if (filter.bedrooms !== undefined) {
      properties = properties.filter(p => p.bedrooms && p.bedrooms >= filter.bedrooms!);
    }

    if (filter.bathrooms !== undefined) {
      properties = properties.filter(p => p.bathrooms && p.bathrooms >= filter.bathrooms!);
    }

    if (filter.search) {
      const query = filter.search.toLowerCase();
      properties = properties.filter(p =>
        p.title.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query) ||
        p.address.toLowerCase().includes(query) ||
        p.city.toLowerCase().includes(query) ||
        p.state.toLowerCase().includes(query) ||
        p.features.some(f => f.toLowerCase().includes(query))
      );
    }

    // Apply sorting
    if (filter.sortBy) {
      switch (filter.sortBy) {
        case "price-asc":
          properties.sort((a, b) => a.price - b.price);
          break;
        case "price-desc":
          properties.sort((a, b) => b.price - a.price);
          break;
        case "size-asc":
          properties.sort((a, b) => a.sizeValue - b.sizeValue);
          break;
        case "size-desc":
          properties.sort((a, b) => b.sizeValue - a.sizeValue);
          break;
        case "date-asc":
          properties.sort((a, b) => new Date(a.dateListed).getTime() - new Date(b.dateListed).getTime());
          break;
        case "date-desc":
          properties.sort((a, b) => new Date(b.dateListed).getTime() - new Date(a.dateListed).getTime());
          break;
      }
    } else {
      // Default: newest first
      properties.sort((a, b) => new Date(b.dateListed).getTime() - new Date(a.dateListed).getTime());
    }

    return properties;
  }

  async getProperty(id: string): Promise<Property | undefined> {
    return this.properties.get(id);
  }

  async createProperty(insertProperty: InsertProperty): Promise<Property> {
    const id = randomUUID();
    const property: Property = {
      ...insertProperty,
      id,
      bedrooms: insertProperty.bedrooms ?? null,
      bathrooms: insertProperty.bathrooms ?? null,
      status: insertProperty.status ?? "available",
      city: insertProperty.city ?? "Cheyyar",
      state: insertProperty.state ?? "TN",
      dateListed: new Date(),
      views: 0,
    };
    this.properties.set(id, property);
    return property;
  }

  async incrementPropertyViews(id: string): Promise<void> {
    const property = this.properties.get(id);
    if (property) {
      property.views += 1;
      this.properties.set(id, property);
    }
  }
}

export const storage = new MemStorage();
