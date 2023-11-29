using tronos_backend.DTO;

namespace tronos_backend.Interfaces
{
    public interface ICalculatorService 
    {
        CalculatorResultDTO CalculateCost(double valorReal, double kwh = 0.0);
        CalculatorConversorDTO ConverteRealEmEnergia(double valorReal);
    }
}
