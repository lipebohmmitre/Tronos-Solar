using tronos_backend.DTO;
using tronos_backend.Interfaces;

namespace tronos_backend.Services
{
    public class CalculatorService : ICalculatorService
    {

        private const double bandeiraVerdePorReal = 1.1, bandeiraAmarelaPorReal = 33.55, bandeiraVermelhaPorReal = 15.38;

        public CalculatorResultDTO CalculateCost(double valorReal, double kwh = 0.0)
        {
            if (kwh == 0.0)
                kwh = valorReal * bandeiraVerdePorReal;

            var calculatorTotalPowerEnergy = (kwh * 24) * 30;

            var PotencialGeracaoEnergiaPainelSolar = 1;
            var calculatorTotalModules = (kwh * 24) / PotencialGeracaoEnergiaPainelSolar;

            var calculatorTotalEconomy = PotencialGeracaoEnergiaPainelSolar - (kwh * 24);

            //TODO: fazer calculo
            return new CalculatorResultDTO()
            {
                TotalModules = float.Parse(calculatorTotalModules.ToString()),
                TotalPowerEnergy = float.Parse(calculatorTotalPowerEnergy.ToString()),
                TotalEconomy = float.Parse(calculatorTotalEconomy.ToString())
            };
        }

        public CalculatorConversorDTO ConverteRealEmEnergia(double valorReal)
        {
            var conversor = valorReal * bandeiraVerdePorReal;

            return new CalculatorConversorDTO()
            {
                ConversorRealToEnergy = float.Parse(conversor.ToString())
            };
        }
    }
}
