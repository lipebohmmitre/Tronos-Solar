﻿using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace tronos_backend.Migrations
{
    /// <inheritdoc />
    public partial class pricekit : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Price",
                table: "Kits",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Price",
                table: "Kits");
        }
    }
}
