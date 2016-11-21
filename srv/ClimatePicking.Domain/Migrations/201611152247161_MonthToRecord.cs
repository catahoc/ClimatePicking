namespace ClimatePicking.Domain.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class MonthToRecord : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.CityClimateRecords", "Month", c => c.String());
            AddColumn("dbo.CityClimateRecords", "MonthIndex", c => c.Int(nullable: false));
            DropColumn("dbo.CityClimates", "Month");
            DropColumn("dbo.CityClimates", "MonthIndex");
        }
        
        public override void Down()
        {
            AddColumn("dbo.CityClimates", "MonthIndex", c => c.Int(nullable: false));
            AddColumn("dbo.CityClimates", "Month", c => c.String());
            DropColumn("dbo.CityClimateRecords", "MonthIndex");
            DropColumn("dbo.CityClimateRecords", "Month");
        }
    }
}
