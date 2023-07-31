using API.Entities;
using Microsoft.AspNetCore.Identity;

namespace API.Data
{
    public static class DbInitializer
    {
        public static async void Initialize(SouqContext context,UserManager<User> userManager){

                        if(!userManager.Users.Any()){
                            var user=new User{
                                UserName="amir",
                                Email="amir@souq.com"
                            };
                            await userManager.CreateAsync(user,"Admin123!");
                            await userManager.AddToRoleAsync(user,"Member");

                            
                              var admin=new User{
                                UserName="admin",
                                Email="admin@souq.com"
                            };
                            await userManager.CreateAsync(admin,"Admin123!");
                            await userManager.AddToRolesAsync(admin,new []{"Admin","Member"});

                        }

            if(context.Products!.Any()) return;
            var products = new List<Product>{
                				new Product
                {
                    Name = "DELL Vostro 3500",
                    Description =
                        "Intel Core I7 - 16GB RAM - 1TB HDD - 512GB SSD - 15.6-inch FHD - 2GB GPU - Windows 10 Pro - Black.",
                    Price = 890000,
                    PictureUrl = "/images/products/1.jpg",
                    Brand = "DELL",
                    Type = "Laptops",
                    QuantityInStock = 50
                },
                new Product
                {
                    Name = "MSI GF63 Thin Gaming Laptop",
                    Description = "MSI GF63 Thin Gaming Laptop - Intel Core I5 - 8GB RAM - 256GB SSD - 15.6-inch FHD - 4GB GPU - Windows 10 - Black (English Keyboard).",
                    Price = 780000,
                    PictureUrl = "/images/products/2.jpg",
                    Brand = "MSI",
                    Type = "Laptops",
                    QuantityInStock = 50
                },
                new Product
                {
                    Name = "DELL G3 15-3500 Gaming Laptop",
                    Description =
                        "DELL G3 15-3500 Gaming Laptop - Intel Core I5-10300H - 8GB RAM - 256GB SSD + 1TB HDD - 15.6-inch FHD - 4GB GTX 1650 GPU - Ubuntu - Black.",
                    Price = 1240000,
                    PictureUrl = "/images/products/3.jpg",
                    Brand = "DELL",
                    Type = "Laptops",
                    QuantityInStock = 50
                },
                new Product
                {
                    Name = "Lenovo Thinkpad E14 Laptop",
                    Description =
                        "Lenovo Thinkpad E14 Laptop - Intel Core I7 - 16GB RAM - 1TB HDD + 256GB SSD - 14-inch FHD - 2GB GPU - Windows 10 Pro - Black.",
                    Price = 1850000,
                    PictureUrl = "/images/products/4.jpg",
                    Brand = "Lenovo",
                    Type = "Laptops",
                    QuantityInStock = 100
                },
                new Product
                {
                    Name = "Samsung UA43T5300",
                    Description =
                        "Samsung UA43T5300 - 43-inch Full HD Smart TV With Built-In Receiver.",
                    Price = 650000,
                    PictureUrl = "/images/products/5.jpg",
                    Brand = "Samsung",
                    Type = "Televisions",
                    QuantityInStock = 50
                },
                new Product
                {
                    Name = "Toshiba 43L5965EA",
                    Description =
                        "Toshiba 43L5965EA - 43-inch Full HD LED Smart TV With Android OS.",
                    Price = 560000,
                    PictureUrl = "/images/products/6.jpg",
                    Brand = "Toshiba",
                    Type = "Televisions",
                    QuantityInStock = 50
                },
                new Product
                {
                    Name = "LG 43LM6370PVA",
                    Description =
                        "LG 43LM6370PVA - 43-inch Full HD Smart TV With Built-in Receiver.",
                    Price = 620000,
                    PictureUrl = "/images/products/7.jpg",
                    Brand = "LG",
                    Type = "Televisions",
                    QuantityInStock = 50
                },
                new Product
                {
                    Name = "Samsung 50 AU7000",
                    Description =
                        "Samsung 50 AU7000 - 50-inch Crystal UHD 4K Smart TV.",
                    Price = 750000,
                    PictureUrl = "/images/products/8.jpg",
                    Brand = "Samsung",
                    Type = "Televisions",
                    QuantityInStock = 50
                },
                new Product
                {
                    Name = "Samsung Galaxy A12",
                    Description =
                        "Samsung Galaxy A12 - 6.4-inch 128GB/4GB Dual SIM Mobile Phone - White.",
                    Price = 285000,
                    PictureUrl = "/images/products/9.jpg",
                    Brand = "Samsung",
                    Type = "Mobile Phones",
                    QuantityInStock = 50
                },
                new Product
                {
                    Name = "Apple iPhone 12 Pro Max",
                    Description =
                        "Apple iPhone 12 Pro Max Dual SIM with FaceTime - 256GB - Pacific Blue.",
                    Price = 2250000,
                    PictureUrl = "/images/products/10.jpg",
                    Brand = "Apple",
                    Type = "Mobile Phones",
                    QuantityInStock = 50
                },
                new Product
                {
                    Name = "Apple IPhone 11",
                    Description =
                        "Apple IPhone 11 With FaceTime - 128GB - Green.",
                    Price = 1320000,
                    PictureUrl = "/images/products/11.jpg",
                    Brand = "Apple",
                    Type = "Mobile Phones",
                    QuantityInStock = 50
                },
                new Product
                {
                    Name = "Samsung Galaxy A52s",
                    Description =
                        "Samsung Galaxy A52s - 6.5-inch 128GB/8GB Dual Sim 5G Mobile Phone - Awesome Mint.",
                    Price = 690000,
                    PictureUrl = "/images/products/12.jpg",
                    Brand = "Samsung",
                    Type = "Mobile Phones",
                    QuantityInStock = 50
                },
                new Product
                {
                    Name = "OPPO Realme 8 Pro Case",
                    Description =
                        "OPPO Realme 8 Pro Case, Dual Layer PC Back TPU Bumper Hybrid No-Slip Shockproof Cover For OPPO Realme 8 / Realme 8 Pro 4G.",
                    Price = 11500,
                    PictureUrl = "/images/products/13.jpg",
                    Brand = "OPPO",
                    Type = "Mobile Accessories",
                    QuantityInStock = 50
                },
                new Product
                {
                    Name = "Galaxy Z Flip3 5G Case",
                    Description =
                        "Galaxy Z Flip3 5G Case, Slim Luxury Electroplate Frame Crystal Clear Back Protective Case Cover For Samsung Galaxy Z Flip 3 5G Purple.",
                    Price = 25000,
                    PictureUrl = "/images/products/14.jpg",
                    Brand = "Samsung",
                    Type = "Mobile Accessories",
                    QuantityInStock = 50
                },
                new Product
                {
                    Name = "Phone Case For Realme 8",
                    Description =
                        "Phone Case For Realme 8 Realme 8 Pro Luxury Electroplate Frame.",
                    Price = 8600,
                    PictureUrl = "/images/products/15.jpg",
                    Brand = "Realme",
                    Type = "Mobile Accessories",
                    QuantityInStock = 50
                },
                new Product
                {
                    Name = "Ugreen Waterproof Mobile Pouch",
                    Description =
                        "Ugreen Waterproof Mobile Pouch With Finger Print For Swimming And Other Outdoor Activities - LP186/50919.",
                    Price = 88800,
                    PictureUrl = "/images/products/16.jpg",
                    Brand = "Apple",
                    Type = "Mobile Accessories",
                    QuantityInStock = 50
                }
            };

            foreach (var product in products)
            {
                context.Products!.Add(product);
            }
            context.SaveChanges();
        }
    }
}