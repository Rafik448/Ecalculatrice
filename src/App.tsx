import { useState } from 'react';
import { Calculator } from 'lucide-react';

function App() {
  const [formData, setFormData] = useState({
    coutPiece: '',
    prixVente: '',
    coutLivraison: '',
    coutConfirmation: '',
    autresCouts: '',
    coutParAchatEuro: '',
    tauxChange: '',
    tauxLivraison: '',
  });

  const [results, setResults] = useState<{
    revenuNet: number;
    margeNette: number;
    rentable: boolean;
  } | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const calculateProfitability = (e: React.FormEvent) => {
    e.preventDefault();

    const coutPiece = parseFloat(formData.coutPiece) || 0;
    const prixVente = parseFloat(formData.prixVente) || 0;
    const coutLivraison = parseFloat(formData.coutLivraison) || 0;
    const coutConfirmation = parseFloat(formData.coutConfirmation) || 0;
    const autresCouts = parseFloat(formData.autresCouts) || 0;
    const coutParAchatEuro = parseFloat(formData.coutParAchatEuro) || 0;
    const tauxChange = parseFloat(formData.tauxChange) || 0;
    const tauxLivraison = parseFloat(formData.tauxLivraison) || 0;

    const coutParAchatDA = coutParAchatEuro * tauxChange;

    const revenuNet = ((prixVente - (coutPiece + coutLivraison + coutConfirmation + autresCouts + coutParAchatDA)) * (tauxLivraison / 100));

    const margeNette = prixVente > 0 ? (revenuNet / prixVente) * 100 : 0;

    const rentable = revenuNet > 0;

    setResults({
      revenuNet,
      margeNette,
      rentable,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <div className="flex items-center gap-3 mb-6">
            <Calculator className="w-8 h-8 text-blue-600" />
            <h1 className="text-2xl font-semibold text-gray-800">
              Calculateur de Rentabilité COD
            </h1>
          </div>

          <form onSubmit={calculateProfitability} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Coût de la pièce (DA)
              </label>
              <input
                type="number"
                name="coutPiece"
                value={formData.coutPiece}
                onChange={handleChange}
                step="0.01"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                placeholder="0.00"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Prix de vente total (DA)
              </label>
              <input
                type="number"
                name="prixVente"
                value={formData.prixVente}
                onChange={handleChange}
                step="0.01"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                placeholder="0.00"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Coût de livraison (DA)
              </label>
              <input
                type="number"
                name="coutLivraison"
                value={formData.coutLivraison}
                onChange={handleChange}
                step="0.01"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                placeholder="0.00"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Coût de confirmation (DA)
              </label>
              <input
                type="number"
                name="coutConfirmation"
                value={formData.coutConfirmation}
                onChange={handleChange}
                step="0.01"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                placeholder="0.00"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Autres coûts (DA)
              </label>
              <input
                type="number"
                name="autresCouts"
                value={formData.autresCouts}
                onChange={handleChange}
                step="0.01"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                placeholder="0.00"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Coût par achat (€)
              </label>
              <input
                type="number"
                name="coutParAchatEuro"
                value={formData.coutParAchatEuro}
                onChange={handleChange}
                step="0.01"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                placeholder="0.00"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Taux de change (1 € = DA)
              </label>
              <input
                type="number"
                name="tauxChange"
                value={formData.tauxChange}
                onChange={handleChange}
                step="0.01"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                placeholder="0.00"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Taux de livraison (%)
              </label>
              <input
                type="number"
                name="tauxLivraison"
                value={formData.tauxLivraison}
                onChange={handleChange}
                step="0.01"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                placeholder="Taux de livraison total"
              />
              <p className="text-xs text-gray-500 mt-1">
                Taux de livraison total
              </p>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-md font-medium hover:bg-blue-700 transition-colors mt-6"
            >
              Calculer
            </button>
          </form>

          {results && (
            <div className="mt-8 p-6 bg-gray-50 rounded-lg border border-gray-200">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Résultats</h2>

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Revenu net estimé:</span>
                  <span className="text-xl font-semibold text-gray-900">
                    {results.revenuNet.toFixed(2)} DA
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Marge nette:</span>
                  <span className="text-xl font-semibold text-gray-900">
                    {results.margeNette.toFixed(2)}%
                  </span>
                </div>

                <div className="pt-3 border-t border-gray-300">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Statut:</span>
                    <span
                      className={`text-xl font-bold ${
                        results.rentable ? 'text-green-600' : 'text-red-600'
                      }`}
                    >
                      {results.rentable ? 'Rentable' : 'Non rentable'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
