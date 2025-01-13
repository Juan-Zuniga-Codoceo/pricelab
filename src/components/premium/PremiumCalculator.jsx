// src/components/premium/PremiumCalculator.jsx
import React from 'react';
import CalculatorBase from '../calculator/CalculatorBase';
import { Card, CardContent } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const PremiumFields = ({ inputs, handleInputChange }) => (
  <div className="mt-6 border-t pt-6">
    <h3 className="text-lg font-medium text-gray-900 mb-4">
      Opciones Premium
    </h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Costo Almacenamiento
        </label>
        <input
          type="number"
          name="costoAlmacenamiento"
          value={inputs.costoAlmacenamiento}
          onChange={handleInputChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Costo Embalaje
        </label>
        <input
          type="number"
          name="costoEmbalaje"
          value={inputs.costoEmbalaje}
          onChange={handleInputChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Margen Personalizado (%)
        </label>
        <input
          type="number"
          name="margenPersonalizado"
          value={inputs.margenPersonalizado}
          onChange={handleInputChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Tasa de Impuestos (%)
        </label>
        <input
          type="number"
          name="tasaImpuestos"
          value={inputs.tasaImpuestos}
          onChange={handleInputChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>
    </div>
  </div>
);

const PremiumResults = ({ results }) => (
  <Card className="mt-6">
    <CardContent className="pt-6">
      <h3 className="text-lg font-medium text-gray-900 mb-4">
        Análisis Avanzado
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <p className="text-sm text-gray-600">Rentabilidad Anual Estimada</p>
          <p className="text-2xl font-bold text-blue-600">
            ${results.rentabilidadAnual?.toLocaleString('es-CL')} CLP
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Punto de Equilibrio</p>
          <p className="text-2xl font-bold text-blue-600">
            {results.puntoEquilibrio} unidades
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Precio Óptimo Sugerido</p>
          <p className="text-2xl font-bold text-blue-600">
            ${results.precioOptimo?.toLocaleString('es-CL')} CLP
          </p>
        </div>
      </div>

      {/* Gráfico de distribución de costos */}
      <div className="mt-8">
        <h4 className="text-md font-medium text-gray-900 mb-4">
          Distribución de Costos
        </h4>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={results.historialPrecios}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="fecha" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="precio" 
                stroke="#2563eb" 
                name="Precio de Venta"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </CardContent>
  </Card>
);

const PremiumCalculator = () => {
  return (
    <div>
      <CalculatorBase isPremium={true} />
      <PremiumFields />
      <PremiumResults />
    </div>
  );
};

export default PremiumCalculator;