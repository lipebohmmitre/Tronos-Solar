using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace tronos_backend.Migrations
{
    /// <inheritdoc />
    public partial class ajustesnomesingles : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Usuarios");

            migrationBuilder.DropColumn(
                name: "complemento",
                table: "Enderecos");

            migrationBuilder.DropColumn(
                name: "numero",
                table: "Enderecos");

            migrationBuilder.RenameColumn(
                name: "cep",
                table: "Enderecos",
                newName: "Cep");

            migrationBuilder.RenameColumn(
                name: "id",
                table: "Enderecos",
                newName: "Id");

            migrationBuilder.RenameColumn(
                name: "rua",
                table: "Enderecos",
                newName: "Street");

            migrationBuilder.RenameColumn(
                name: "cidade",
                table: "Enderecos",
                newName: "District");

            migrationBuilder.RenameColumn(
                name: "bairro",
                table: "Enderecos",
                newName: "City");

            migrationBuilder.AddColumn<string>(
                name: "Number",
                table: "Enderecos",
                type: "nvarchar(20)",
                maxLength: 20,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Observation",
                table: "Enderecos",
                type: "nvarchar(2000)",
                maxLength: 2000,
                nullable: false,
                defaultValue: "");

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    Email = table.Column<string>(type: "nvarchar(150)", maxLength: 150, nullable: false),
                    Document = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    PersonType = table.Column<int>(type: "int", maxLength: 100, nullable: false),
                    Admin = table.Column<bool>(type: "bit", nullable: false),
                    AddressId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Users_Enderecos_AddressId",
                        column: x => x.AddressId,
                        principalTable: "Enderecos",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Users_AddressId",
                table: "Users",
                column: "AddressId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Users");

            migrationBuilder.DropColumn(
                name: "Number",
                table: "Enderecos");

            migrationBuilder.DropColumn(
                name: "Observation",
                table: "Enderecos");

            migrationBuilder.RenameColumn(
                name: "Cep",
                table: "Enderecos",
                newName: "cep");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "Enderecos",
                newName: "id");

            migrationBuilder.RenameColumn(
                name: "Street",
                table: "Enderecos",
                newName: "rua");

            migrationBuilder.RenameColumn(
                name: "District",
                table: "Enderecos",
                newName: "cidade");

            migrationBuilder.RenameColumn(
                name: "City",
                table: "Enderecos",
                newName: "bairro");

            migrationBuilder.AddColumn<string>(
                name: "complemento",
                table: "Enderecos",
                type: "nvarchar(150)",
                maxLength: 150,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<int>(
                name: "numero",
                table: "Enderecos",
                type: "int",
                maxLength: 6,
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "Usuarios",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    endereçoUsuarioid = table.Column<int>(type: "int", nullable: false),
                    admin = table.Column<bool>(type: "bit", nullable: false),
                    documento = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    email = table.Column<string>(type: "nvarchar(150)", maxLength: 150, nullable: false),
                    name = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    tipoPessoa = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Usuarios", x => x.id);
                    table.ForeignKey(
                        name: "FK_Usuarios_Enderecos_endereçoUsuarioid",
                        column: x => x.endereçoUsuarioid,
                        principalTable: "Enderecos",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Usuarios_endereçoUsuarioid",
                table: "Usuarios",
                column: "endereçoUsuarioid");
        }
    }
}
