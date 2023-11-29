using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace tronos_backend.Migrations
{
    /// <inheritdoc />
    public partial class attkit : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "KwhProductionPerMonth",
                table: "Kits",
                newName: "KwhProductionPerMonthBase");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "KwhProductionPerMonthBase",
                table: "Kits",
                newName: "KwhProductionPerMonth");
        }
    }
}
