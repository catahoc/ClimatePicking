namespace ClimatePicking.Domain.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class CitiesHaveLonLat : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Cities", "Lon", c => c.Double(nullable: false));
            AddColumn("dbo.Cities", "Lat", c => c.Double(nullable: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.Cities", "Lat");
            DropColumn("dbo.Cities", "Lon");
        }
    }
}
