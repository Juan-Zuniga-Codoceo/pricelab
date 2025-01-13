// src/hooks/useCalculator.js
import { useState, useEffect } from 'react';
import { calculateBasic, calculatePremium } from '@/utils/calculations';

export const useCalculator = (isPremium = false) => {
  const [inputs, setInputs] = useState({
    costoProducto: 24000,
    envioPromedio: 8000,
    porcentajeFalla: 10,
    appsShopifyCosto: 500,
    productosEstimados: 100,
    conversionPorcentaje: 5,
    costoAlmacenamiento: 0,
    costoEmbalaje: 0,
    margenPersonalizado: 20,
    tasaImpuestos: 19,
  });

  const [results, setResults] = useState({});
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const calculate = () => {
      const calculationResults = isPremium 
        ? calculatePremium(inputs)
        : calculateBasic(inputs);

      setResults(calculationResults);
      
      // Agregar al historial
      setHistory(prev => [...prev, {
        date: new Date().toISOString(),
        ...calculationResults
      }].slice(-10)); // Mantener solo los últimos 10 cálculos
    };

    calculate();
  }, [inputs, isPremium]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputs(prev => ({
      ...prev,
      [name]: parseFloat(value) || 0
    }));
  };

  const resetCalculator = () => {
    setInputs({
      costoProducto: 24000,
      envioPromedio: 8000,
      porcentajeFalla: 10,
      appsShopifyCosto: 500,
      productosEstimados: 100,
      conversionPorcentaje: 5,
      costoAlmacenamiento: 0,
      costoEmbalaje: 0,
      margenPersonalizado: 20,
      tasaImpuestos: 19,
    });
  };

  const saveCalculation = () => {
    // Aquí podrías implementar la lógica para guardar en localStorage o en una API
    const calculation = {
      id: Date.now(),
      inputs: { ...inputs },
      results: { ...results },
      date: new Date().toISOString()
    };
    return calculation;
  };

  return {
    inputs,
    results,
    history,
    handleInputChange,
    resetCalculator,
    saveCalculation
  };
};

export default useCalculator;