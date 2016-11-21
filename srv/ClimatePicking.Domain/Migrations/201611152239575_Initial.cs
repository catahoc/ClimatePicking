namespace ClimatePicking.Domain.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Initial : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Cities",
                c => new
                    {
                        Id = c.Long(nullable: false, identity: true),
                        IsCapital = c.Boolean(nullable: false),
                        Name = c.String(),
                        Country_Id = c.Long(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Countries", t => t.Country_Id)
                .Index(t => t.Country_Id);
            
            CreateTable(
                "dbo.Countries",
                c => new
                    {
                        Id = c.Long(nullable: false, identity: true),
                        Name = c.String(),
                        Population = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.CityClimateRecords",
                c => new
                    {
                        Id = c.Long(nullable: false, identity: true),
                        AvgMin = c.Double(nullable: false),
                        AbsMax = c.Double(nullable: false),
                        AvgMinFahr = c.Double(nullable: false),
                        AbsMaxFahr = c.Double(nullable: false),
                        CityClimate_Id = c.Long(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.CityClimates", t => t.CityClimate_Id)
                .Index(t => t.CityClimate_Id);
            
            CreateTable(
                "dbo.CityClimates",
                c => new
                    {
                        Id = c.Long(nullable: false, identity: true),
                        Month = c.String(),
                        MonthIndex = c.Int(nullable: false),
                        TargetCity_Id = c.Long(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Cities", t => t.TargetCity_Id)
                .Index(t => t.TargetCity_Id);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.CityClimates", "TargetCity_Id", "dbo.Cities");
            DropForeignKey("dbo.CityClimateRecords", "CityClimate_Id", "dbo.CityClimates");
            DropForeignKey("dbo.Cities", "Country_Id", "dbo.Countries");
            DropIndex("dbo.CityClimates", new[] { "TargetCity_Id" });
            DropIndex("dbo.CityClimateRecords", new[] { "CityClimate_Id" });
            DropIndex("dbo.Cities", new[] { "Country_Id" });
            DropTable("dbo.CityClimates");
            DropTable("dbo.CityClimateRecords");
            DropTable("dbo.Countries");
            DropTable("dbo.Cities");
        }
    }
}
