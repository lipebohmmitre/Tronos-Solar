using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace tronos_backend.Migrations
{
    /// <inheritdoc />
    public partial class energycompany : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "EnergyCompanies",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Code = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    StateCode = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    KwhPrice = table.Column<decimal>(type: "decimal(18,3)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EnergyCompanies", x => x.Id);
                });

            migrationBuilder.InsertData(
            table: "EnergyCompanies",
            columns: new[] { "Name", "StateCode", "KwhPrice", "Code" },
            values: new object[,]
            {
                { "Energisa Acre", "AC", 0.74, "AC-EA" },
                { "Equatorial Energia Alagoas", "AL", 0.74, "AL-EEA" },
                { "Companhia de Eletricidade do Amapá", "AP", 0.74, "AP-CEA" },
                { "Centrais Elétricas de Manaus", "AM", 0.74, "AM-CEM" },
                { "Companhia Energética do Amazonas", "AM", 0.74, "AM-CEA" },
                { "Eletrobras Distribuição Amazonas", "AM", 0.74, "AM-EDA" },
                { "Amazonas Energia", "AM", 0.74, "AM-AE" },
                { "Neoenergia Coelba", "BA", 0.74, "BA-NC" },
                { "Enel Distribuição Ceará", "CE", 0.74, "CE-EDC" },
                { "Companhia Energética de Brasília", "DF", 0.74, "DF-CEB" },
                { "Neoenergia DF", "DF", 0.74, "DF-NDF" },
                { "Espírito Santo Centrais Elétricas S/A", "ES", 0.74, "ES-ESCESA" },
                { "Escelsa e Empresa Luz e Força Santa Maria", "ES", 0.74, "ES-EELFSM" },
                { "Equatorial Energia Goiás", "GO", 0.74, "GO-EEG" },
                { "Equatorial Energia Maranhão", "MA", 0.74, "MA-EEM" },
                { "Energisa Mato Grosso", "MT", 0.74, "MT-EMT" },
                { "Energisa Mato Grosso do Sul", "MS", 0.74, "MS-EMTS" },
                { "ELEKTRO", "MS", 0.74, "MS-ELEKTRO" },
                { "Companhia Energética de Minas Gerais", "MG", 0.74, "MG-CEMIG" },
                { "Centrais Elétricas do Pará S.A", "PA", 0.74, "PA-CEPA" },
                { "Equatorial Energia Para", "PA", 0.74, "PA-EEP" },
                { "Energisa Paraíba", "PB", 0.74, "PB-EP" },
                { "Copel", "PR", 0.74, "PR-COPEL" },
                { "Neoenergia Pernambuco", "PE", 0.74, "PE-NEP" },
                { "Equatorial Energia Piauí", "PI", 0.74, "PI-EEP" },
                { "Enel Distribuição Rio", "RJ", 0.74, "RJ-EDR" },
                { "Companhia Energética do Rio Grande do Norte", "RN", 0.74, "RN-CERN" },
                { "CEEE-D - (Grupo Equatorial Energia)", "RS", 0.74, "RS-CEEE" },
                { "RGE - (CPFL Energia)", "RS", 0.74, "RS-RGE" },
                { "Energisa", "RO", 0.74, "RO-E" },
                { "Companhia Energética de Roraima", "RR", 0.74, "RR-CER" },
                { "Celesc Distribuição", "SC", 0.74, "SC-CD" },
                { "Eletropaulo", "SP", 0.74, "SP-E" },
                { "CPFL", "SP", 0.74, "SP-C" },
                { "EDP São Paulo", "SP", 0.74, "SP-ESP" },
                { "Elektro", "SP", 0.74, "SP-E" },
                { "Energisa São Paulo", "SP", 0.74, "SP-ESP" },
                { "Energisa Sergipe", "SE", 0.74, "SE-ES" },
                { "Energisa Tocantins", "TO", 0.74, "TO-ET" }
            });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "EnergyCompanies");
        }
    }
}
