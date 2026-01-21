import React, { useState } from 'react';
import { Search, Info, ExternalLink } from 'lucide-react';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import './App.css';

const vaccinesData = [
    {
        id: 1, pathologie: "Coqueluche", icon: "🦠",
        jeunes: { vaccins: ["Hexavalent", "DTCaPolio"], doses: "2, 4, 11 mois (Obligatoire)", rappels: "6 ans et 11-13 ans" },
        adultes: { vaccins: ["dTcaPolio"], doses: "Rappel 25 ans (Obligatoire)", rappels: "45, 65 ans, puis tous les 10 ans" },
        special: "Femmes enceintes : à chaque grossesse (20-36 SA)."
    },
    {
        id: 2, pathologie: "Diphtérie, Tétanos, Polio", icon: "💉",
        jeunes: { vaccins: ["Hexavalent", "DTCaPolio"], doses: "2, 4, 11 mois (Obligatoire)", rappels: "6 ans et 11-13 ans" },
        adultes: { vaccins: ["dTcaPolio"], doses: "Rappels 25, 45, 65 ans", rappels: "Puis tous les 10 ans" },
        special: "Vaccination obligatoire en France."
    },
    {
        id: 3, pathologie: "Méningocoque B", icon: "🧠",
        jeunes: { vaccins: ["Bexsero"], doses: "3, 5, 12 mois (Obligatoire 2025)", rappels: "Rattrapage jusqu'à 24 mois" },
        adultes: { vaccins: ["Bexsero", "Trumenba"], doses: "Peut être proposé 15-24 ans", rappels: "N/A" },
        special: "OBLIGATOIRE pour les nourrissons nés dès 2025."
    },
    {
        id: 4, pathologie: "Méningocoques ACWY", icon: "🧠",
        jeunes: { vaccins: ["Nimenrix", "Menquadfi"], doses: "6 mois et 12 mois (Obligatoire 2025)", rappels: "Rappel à 11-14 ans" },
        adultes: { vaccins: ["Nimenrix", "Menquadfi", "Menveo"], doses: "Rattrapage jusqu'à 24 ans", rappels: "N/A" },
        special: "Nouvelle obligation pour tous les nourrissons."
    },
    {
        id: 5, pathologie: "Papillomavirus (HPV)", icon: "🛡️",
        jeunes: { vaccins: ["Gardasil 9"], doses: "2 doses entre 11-14 ans", rappels: "Rattrapage 15-19 ans" },
        adultes: { vaccins: ["Gardasil 9"], doses: "Rattrapage jusqu'à 26 ans (H et F)", rappels: "N/A" },
        special: "Filles et garçons. Très efficace avant 1er rapport."
    },
    {
        id: 6, pathologie: "ROR (Rougeole, Oreillons, Rubéole)", icon: "✨",
        jeunes: { vaccins: ["Priorix", "M-M-RVAXPRO"], doses: "12 mois et 16-18 mois (Obligatoire)", rappels: "N/A" },
        adultes: { vaccins: ["Priorix", "M-M-RVAXPRO"], doses: "2 doses au total si né après 1980", rappels: "N/A" },
        special: "Obligatoire. 3e dose si 1ère dose avant 12 mois."
    },
    {
        id: 7, pathologie: "Hépatite B", icon: "💊",
        jeunes: { vaccins: ["Hexavalent", "Engerix B"], doses: "2, 4, 11 mois (Obligatoire)", rappels: "Rattrapage possible" },
        adultes: { vaccins: ["Engerix B20", "HBVAXPRO 10"], doses: "Schéma 3 doses (M0, M1, M6)", rappels: "Non systématique" },
        special: "Obligatoire. Protection à vie une fois vacciné."
    },
    {
        id: 8, pathologie: "Pneumocoque", icon: "🫁",
        jeunes: { vaccins: ["Prevenar 13"], doses: "2, 4, 11 mois (Obligatoire)", rappels: "N/A" },
        adultes: { vaccins: ["Prevenar 20", "Capvaxive"], doses: "1 dose unique à 65 ans", rappels: "N/A" },
        special: "Prevenar 20 ou Capvaxive privilégiés chez l'adulte ≥65 ans."
    },
    {
        id: 9, pathologie: "Grippe Saisonnière", icon: "🤧",
        jeunes: { vaccins: ["Vaxigrip Trivalent", "Influvac Trivalent"], doses: "Annuel si risque médical (dès 6 mois)", rappels: "Chaque automne" },
        adultes: { vaccins: ["Efluelda Trivalent", "Fluad Trivalent"], doses: "Recommandé dès 65 ans", rappels: "Annuel" },
        special: "Efluelda/Fluad privilégiés pour les ≥65 ans (plus dosés)."
    },
    {
        id: 10, pathologie: "VRS (Bronchiolite)", icon: "🌬️",
        jeunes: { vaccins: ["Abrysvo (femmes enceintes)"], doses: "Femmes enceintes : 32-36 SA", rappels: "N/A" },
        adultes: { vaccins: ["Arexvy", "Abrysvo", "mResvia"], doses: "Dès 75 ans (ou 65 ans si risque)", rappels: "Saisonnier (sept-janv)" },
        special: "Beyfortus = anticorps (non vaccin). Nouveau vaccin 2024."
    },
    {
        id: 11, pathologie: "COVID-19", icon: "😷",
        jeunes: { vaccins: ["ARNm (variant adapté)"], doses: "Dès 6 mois si risque", rappels: "Saisonnier" },
        adultes: { vaccins: ["ARNm (variant adapté)", "Nuvaxovid"], doses: "Dès 65 ans ou risque", rappels: "Chaque automne" },
        special: "Rappel printemps pour les ≥80 ans et immunodéprimés."
    },
    {
        id: 12, pathologie: "Rotavirus", icon: "🍼",
        jeunes: { vaccins: ["Rotarix (2 doses)", "RotaTeq (3 doses)"], doses: "Début 6-12 sem, fin avant 24-32 sem", rappels: "N/A" },
        adultes: { vaccins: ["-"], doses: "Non indiqué", rappels: "N/A" },
        special: "Vaccination orale uniquement. Rotarix avant 24 sem, RotaTeq avant 32 sem."
    },
    {
        id: 13, pathologie: "Zona", icon: "⚡",
        jeunes: { vaccins: ["-"], doses: "Non indiqué", rappels: "N/A" },
        adultes: { vaccins: ["Shingrix"], doses: "2 doses (M0, M2 à M6)", rappels: "Dès 65 ans" },
        special: "Aussi pour les adultes immunodéprimés dès 18 ans."
    },
    {
        id: 14, pathologie: "Hépatite A", icon: "🍽️",
        jeunes: { vaccins: ["Avaxim 80", "Havrix 720"], doses: "Dès 12 mois (Risques/Voyage)", rappels: "2e dose 6-12 mois après" },
        adultes: { vaccins: ["Avaxim 160", "Havrix 1440", "Vaqta 50"], doses: "Selon risques pro ou voyage", rappels: "2e dose après 6-12 mois" },
        special: "Recommandé pour les HSH et porteurs d'hépatites chroniques."
    },
    {
        id: 15, pathologie: "Varicelle", icon: "🫧",
        jeunes: { vaccins: ["Varilrix", "Varivax"], doses: "Rattrapage 12-18 ans (2 doses)", rappels: "N/A" },
        adultes: { vaccins: ["Varivax", "Varilrix"], doses: "Si pas d'antécédent (2 doses)", rappels: "N/A" },
        special: "Recommandé aux femmes en âge de procréer (hors grossesse)."
    },
    {
        id: 16, pathologie: "Fièvre Jaune", icon: "🌴",
        jeunes: { vaccins: ["Stamaril"], doses: "Dès 9 mois (Guyane)", rappels: "2e dose 6-10 ans après si 9-24 mois" },
        adultes: { vaccins: ["Stamaril"], doses: "OBLIGATOIRE Guyane / Voyageurs", rappels: "Généralement 1 dose à vie" },
        special: "Obligatoire pour tout séjour en Guyane."
    },
    {
        id: 17, pathologie: "Tuberculose (BCG)", icon: "🩹",
        jeunes: { vaccins: ["BCG"], doses: "Dès la naissance (si risque)", rappels: "N/A" },
        adultes: { vaccins: ["BCG"], doses: "Risque pro uniquement", rappels: "N/A" },
        special: "OBLIGATOIRE Guyane/Mayotte. Recommandé si risque élevé."
    },
    {
        id: 18, pathologie: "Mpox (Variole du singe)", icon: "🐵",
        jeunes: { vaccins: ["Imvanex"], doses: "Possible selon exposition", rappels: "N/A" },
        adultes: { vaccins: ["Jynneos", "Imvanex"], doses: "2 doses à 28 jours", rappels: "N/A" },
        special: "Utilisé en vaccination réactive ou préventive ciblée."
    },
    {
        id: 19, pathologie: "Haemophilus influenzae B", icon: "🔬",
        jeunes: { vaccins: ["Hexavalent", "Hib monovalent"], doses: "2, 4, 11 mois (Obligatoire)", rappels: "Rattrapage jusqu'à 5 ans" },
        adultes: { vaccins: ["-"], doses: "Non indiqué", rappels: "N/A" },
        special: "Obligatoire depuis 2018. Inclus dans vaccin hexavalent."
    },
    {
        id: 20, pathologie: "Dengue", icon: "🦟",
        jeunes: { vaccins: ["Qdenga"], doses: "6-16 ans : 2 doses (3 mois)", rappels: "Non établi" },
        adultes: { vaccins: ["Qdenga"], doses: "17-60 ans si comorbidités (DOM-TOM)", rappels: "Non établi" },
        special: "DOM-TOM uniquement. Antécédent de dengue requis (6-16 ans)."
    }
];

const App = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [ageFilter, setAgeFilter] = useState('jeunes'); // 'jeunes' ou 'adultes'

    const filteredVaccines = vaccinesData.filter(v =>
        v.pathologie.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const openPDF = () => {
        try {
            const doc = new jsPDF('l', 'mm', 'a4');

            // Titre
            doc.setFontSize(18);
            doc.setTextColor(27, 67, 50);
            const title = `CALENDRIER VACCINAL 2025 - PROFIL : ${ageFilter === 'jeunes' ? '0-20 ANS' : '20 ANS ET +'}`;
            doc.text(title, 14, 15);

            // Fonction interne pour nettoyer les caractères spéciaux
            const cleanText = (text) => {
                if (!text) return "-";
                return String(text)
                    .replace(/≥/g, 'plus de')
                    .replace(/\n/g, ' ');
            };

            const tableColumn = ["Maladie", "Vaccins", "Doses / Primo", "Rappels", "Notes Spéciales"];

            const tableRows = filteredVaccines.map(v => [
                cleanText(v.pathologie),
                Array.isArray(v[ageFilter].vaccins) ? v[ageFilter].vaccins.join(', ') : cleanText(v[ageFilter].vaccins),
                cleanText(v[ageFilter].doses),
                cleanText(v[ageFilter].rappels),
                cleanText(v.special)
            ]);

            autoTable(doc, {
                head: [tableColumn],
                body: tableRows,
                startY: 25,
                theme: 'grid',
                headStyles: { fillColor: [27, 67, 50], textColor: [255, 255, 255] },
                styles: {
                    fontSize: 9,
                    overflow: 'linebreak',
                    font: 'helvetica'
                },
                columnStyles: {
                    0: { fontStyle: 'bold', cellWidth: 40 },
                    4: { cellWidth: 'auto' }
                }
            });

            const pdfBlob = doc.output('blob');
            const url = URL.createObjectURL(pdfBlob);
            window.open(url, '_blank');
        } catch (error) {
            console.error("Erreur PDF:", error);
        }
    };

    return (
        <div className="app-container">
            <header className="main-header">
                <h1>Calendrier Vaccinal 2025</h1>
                <p>Répertoire interactif des recommandations françaises (Version Corrigée)</p>
            </header>

            <div className="controls-section">
                <div className="search-bar">
                    <Search size={20} className="icon-search" />
                    <input
                        type="text"
                        placeholder="Rechercher une maladie..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="filter-group">
                    <button
                        onClick={() => setAgeFilter('jeunes')}
                        className={ageFilter === 'jeunes' ? 'active' : ''}
                    >
                        PROFIL : 0 - 20 ANS
                    </button>
                    <button
                        onClick={() => setAgeFilter('adultes')}
                        className={ageFilter === 'adultes' ? 'active' : ''}
                    >
                        PROFIL : 20 ANS ET +
                    </button>
                    <button onClick={openPDF} className="btn-pdf">
                        <ExternalLink size={16} /> VOIR LE PDF
                    </button>
                </div>
            </div>

            <div className="table-wrapper">
                <table className="vaccine-table">
                    <thead>
                    <tr>
                        <th>Maladie</th>
                        <th>Vaccins</th>
                        <th>Primo-vaccination</th>
                        <th>Rappels</th>
                        <th>Notes Spéciales</th>
                    </tr>
                    </thead>
                    <tbody>
                    {filteredVaccines.map(v => (
                        <tr key={v.id}>
                            <td className="td-pathologie">
                                <div className="pathologie-cell">
                                    <span className="emoji-icon">{v.icon}</span>
                                    <span className="pathologie-name">{v.pathologie}</span>
                                </div>
                            </td>
                            <td>
                                {(v[ageFilter].vaccins).map((name, i) => (
                                    <span key={i} className={name === "-" ? "" : "vaccine-tag"}>{name}</span>
                                ))}
                            </td>
                            <td className="text-small">{v[ageFilter].doses}</td>
                            <td className="text-small">{v[ageFilter].rappels}</td>
                            <td className="td-special">
                                <div className="special-content">
                                    <Info size={14} />
                                    <span>{v.special}</span>
                                </div>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default App;