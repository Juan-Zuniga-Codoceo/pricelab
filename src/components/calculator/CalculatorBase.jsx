import React, { useState, useEffect } from 'react';
import { 
  TrendingUp,
  DollarSign,
  Package,
  Truck,
  AlertCircle,
  ShoppingCart,
  Users,
  Target,
  Percent,
  BarChart3
} from 'lucide-react';

const InputField = ({ label, icon: Icon, name, value, onChange, helpText }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700">
      {label}
    </label>
    <div className="mt-1 relative rounded-md shadow-sm">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Icon className="h-5 w-5 text-gray-400" />
      </div>
      <input
        type="number"
        name={name}
        value={value}
        onChange={onChange}
        className="pl-10 block w-full rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
    </div>
    {helpText && (
      <p className="mt-1 text-sm text-gray-500">{helpText}</p>
    )}
  </div>
);

const ResultCard = ({ label, value, highlighted = false }) => (
  <div className={`p-4 rounded-lg ${highlighted ? 'bg-blue-600 text-white' : 'bg-gray-50'}`}>
    <p className={`text-sm ${highlighted ? 'text-blue-100' : 'text-gray-600'}`}>
      {label}
    </p>
    <p className={`${highlighted ? 'text-3xl mt-1' : 'text-xl'} font-bold ${highlighted ? 'text-white' : 'text-gray-900'}`}>
      ${value.toLocaleString('es-CL')} CLP
    </p>
  </div>
);

const CalculatorBase = () => {
  const [inputs, setInputs] = useState({
    costoProducto: 3800,
    envioPromedio: 8000,
    porcentajeFalla: 10,
    costoMensualShopify: 50000,
    ventasEstimadas: 100,
    costoPublicidad: 1000,
    tasaRentabilidad: 20,
  });

  const [resultados, setResultados] = useState({
    envioReal: 0,
    costoAppsShopifyPorProducto: 0,
    costoTotal: 0,
    utilidadMinima: 0,
    precioVenta: 0,
  });

  const calcularResultados = () => {
    const envioReal = inputs.envioPromedio * (1 + inputs.porcentajeFalla / 100);
    const costoAppsShopifyPorProducto = inputs.costoMensualShopify / inputs.ventasEstimadas;
    
    const costoTotal = 
      inputs.costoProducto + 
      envioReal + 
      costoAppsShopifyPorProducto + 
      inputs.costoPublicidad;
    
    const utilidadMinima = costoTotal * (inputs.tasaRentabilidad / 100);
    const precioVenta = costoTotal + utilidadMinima;

    setResultados({
      envioReal: Math.round(envioReal),
      costoAppsShopifyPorProducto: Math.round(costoAppsShopifyPorProducto),
      costoTotal: Math.round(costoTotal),
      utilidadMinima: Math.round(utilidadMinima),
      precioVenta: Math.round(precioVenta)
    });
  };

  useEffect(() => {
    calcularResultados();
  }, [inputs]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputs(prev => ({
      ...prev,
      [name]: parseFloat(value) || 0
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header Actualizado */}
        <div className="bg-blue-600 rounded-2xl shadow-lg overflow-hidden mb-8">
          <div className="px-6 py-8 text-center">
            <div className="flex items-center justify-center mb-3">
              <Package className="w-8 h-8 text-white opacity-75 mr-2" />
              <h1 className="text-4xl font-bold text-white">
                PriceLab
              </h1>
            </div>
            <h2 className="text-xl font-medium text-white mb-2">
              Tu Laboratorio de Precios para E-commerce
            </h2>
            <p className="text-blue-100 max-w-2xl mx-auto">
              Calcula, optimiza y perfecciona tus precios de venta con precisión científica. 
              La herramienta definitiva para emprendedores de dropshipping.
            </p>
          </div>
          
          <div className="bg-white/95 backdrop-blur grid grid-cols-3 divide-x divide-gray-200">
            <div className="p-4 text-center">
              <p className="text-sm text-gray-500">Tasa de Rentabilidad</p>
              <p className="text-2xl font-semibold text-blue-600">{inputs.tasaRentabilidad}%</p>
              <p className="text-xs text-gray-400">Personalizable</p>
            </div>
            <div className="p-4 text-center">
              <p className="text-sm text-gray-500">Margen Promedio</p>
              <p className="text-2xl font-semibold text-green-600">+25%</p>
              <p className="text-xs text-gray-400">Recomendado</p>
            </div>
            <div className="p-4 text-center">
              <p className="text-sm text-gray-500">ROI Estimado</p>
              <p className="text-2xl font-semibold text-indigo-600">1.5x</p>
              <p className="text-xs text-gray-400">Promedio</p>
            </div>
          </div>
        </div>
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Panel de Inputs */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center mb-6">
                <div className="bg-blue-100 p-2 rounded-lg mr-3">
                  <TrendingUp className="w-6 h-6 text-blue-600" />
                </div>
                <h2 className="text-xl font-bold text-gray-900">
                  Datos del Producto
                </h2>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <InputField
                  label="Tasa de Rentabilidad (%)"
                  icon={Percent}
                  name="tasaRentabilidad"
                  value={inputs.tasaRentabilidad}
                  onChange={handleInputChange}
                  helpText="Porcentaje de utilidad deseada sobre el costo total"
                />

                <InputField
                  label="Costo Producto (CLP)"
                  icon={DollarSign}
                  name="costoProducto"
                  value={inputs.costoProducto}
                  onChange={handleInputChange}
                />

                <InputField
                  label="Envío Promedio (CLP)"
                  icon={Truck}
                  name="envioPromedio"
                  value={inputs.envioPromedio}
                  onChange={handleInputChange}
                />

                <InputField
                  label="% Falla"
                  icon={AlertCircle}
                  name="porcentajeFalla"
                  value={inputs.porcentajeFalla}
                  onChange={handleInputChange}
                  helpText="Porcentaje estimado de fallas en envíos"
                />

                <InputField
                  label="Costo Mensual Total (Shopify + Apps)"
                  icon={ShoppingCart}
                  name="costoMensualShopify"
                  value={inputs.costoMensualShopify}
                  onChange={handleInputChange}
                  helpText="Total de gastos mensuales en Shopify y apps"
                />

                <InputField
                  label="Ventas Estimadas por Mes"
                  icon={Users}
                  name="ventasEstimadas"
                  value={inputs.ventasEstimadas}
                  onChange={handleInputChange}
                />

                <InputField
                  label="Costo de Publicidad por Producto (CLP)"
                  icon={Target}
                  name="costoPublicidad"
                  value={inputs.costoPublicidad}
                  onChange={handleInputChange}
                  helpText="Presupuesto máximo para publicidad por unidad vendida"
                />
              </div>
            </div>

            {/* Tips */}
            <div className="bg-blue-50 rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-blue-800 mb-3 flex items-center">
                <BarChart3 className="w-5 h-5 mr-2" />
                Tips para Optimizar
              </h3>
              <ul className="space-y-2 text-sm text-blue-700">
                <li className="flex items-center">
                  <div className="h-1.5 w-1.5 rounded-full bg-blue-600 mr-2"></div>
                  <span>Ajusta la tasa de rentabilidad según tu estrategia de precios</span>
                </li>
                <li className="flex items-center">
                  <div className="h-1.5 w-1.5 rounded-full bg-blue-600 mr-2"></div>
                  <span>Considera un % de falla realista basado en históricos</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Panel de Resultados */}
          <div>
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden sticky top-6">
              <div className="bg-gray-900 p-6">
                <h3 className="text-xl font-bold text-white flex items-center">
                  <Package className="w-6 h-6 mr-2" />
                  Resultados
                </h3>
              </div>

              <div className="p-6 space-y-4">
                <ResultCard 
                  label="Envío Real (con falla)"
                  value={resultados.envioReal}
                />
                
                <ResultCard 
                  label="Costo Shopify/Apps por Producto"
                  value={resultados.costoAppsShopifyPorProducto}
                />

                <ResultCard 
                  label="Costo Total"
                  value={resultados.costoTotal}
                />

                <ResultCard 
                  label={`Utilidad Mínima (${inputs.tasaRentabilidad}%)`}
                  value={resultados.utilidadMinima}
                />

                <div className="pt-4">
                  <ResultCard 
                    label="Precio de Venta Final"
                    value={resultados.precioVenta}
                    highlighted={true}
                  />
                </div>
              </div>
            </div>

            {/* Botones de acción */}
            <div className="mt-6 grid grid-cols-2 gap-4">
              <button className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                Guardar
              </button>
              <button className="w-full px-4 py-2 bg-blue-600 border border-transparent rounded-lg text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                Compartir
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalculatorBase;