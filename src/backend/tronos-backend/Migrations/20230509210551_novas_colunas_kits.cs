using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace tronos_backend.Migrations
{
    /// <inheritdoc />
    public partial class novas_colunas_kits : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<decimal>(
                name: "KwhProductionPerMonth",
                table: "Kits",
                type: "decimal(18,3)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<int>(
                name: "SoldAmount",
                table: "Kits",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "KwhProductionPerMonth",
                table: "Kits");

            migrationBuilder.DropColumn(
                name: "SoldAmount",
                table: "Kits");
        }
    }
}
