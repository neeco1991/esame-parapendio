import { getRandomElement } from '$lib/utils';

const MISSED_ANSWER_PROBABILITY = 0.2;

export interface Question {
	id: string;
	section: string;
	text: string;
	answers: [string, string, string];
	correct_answer_index: 0 | 1 | 2;
}

type Questions = Question[];

type ErrorMap = Record<string, string>;

const getStoredAnswers = (): ErrorMap => {
	const rawStore = localStorage.getItem('answers');
	return rawStore ? JSON.parse(rawStore) : {};
};

const saveStoredAnswers = (store: ErrorMap) => {
	localStorage.setItem('answers', JSON.stringify(store));
};

const getMissedQuestions = (): Questions => {
	const store = getStoredAnswers();
	return questions.filter((question) => {
		return question.id in store;
	});
};

export const pickQuestion = (): Question => {
	if (Math.random() < MISSED_ANSWER_PROBABILITY) {
		const missedQuestions = getMissedQuestions();
		if (missedQuestions.length > 0) {
			return getRandomElement(missedQuestions);
		}
	}

	return getRandomElement(questions);
};

export const submitAnswer = (question: Question, answer: 0 | 1 | 2): boolean => {
	const store = getStoredAnswers();
	const tries = +store[question.id];
	if (question.correct_answer_index === answer) {
		if (tries) {
			if (tries === 1) {
				delete store[question.id];
			} else {
				store[question.id] = (tries - 1).toString();
			}
		}

		saveStoredAnswers(store);

		return true;
	}

	store[question.id] = ((tries || 0) + 2).toString();
	saveStoredAnswers(store);
	return false;
};

const questions: Questions = [
	{
		id: '1001',
		section: 'NORMATIVA E LEGISLAZIONE',
		text: 'Chi può praticare autonomamente il volo libero?',
		answers: [
			"Chiunque può praticare quest'attività sportiva purché abbia frequentato un apposito corso.",
			'Chiunque, munito dei requisiti richiesti dalle norme in vigore (Attestato in corso di validità e copertura assicurativa RCT).',
			"Chiunque può praticare quest'attività purché abbia superato un esame Ae.C.I.."
		],
		correct_answer_index: 1
	},
	{
		id: '1002',
		section: 'NORMATIVA E LEGISLAZIONE',
		text: "Chi è l'unico responsabile della condotta del deltaplano e del parapendio?",
		answers: [
			'Il pilota.',
			'Il pilota, ma solo se dotato di sufficiente esperienza.',
			"L'Ente di Controllo del Traffico Aereo."
		],
		correct_answer_index: 0
	},
	{
		id: '1003',
		section: 'NORMATIVA E LEGISLAZIONE',
		text: "Qual è l'età minima, previo consenso dei genitori, per la pratica del Volo Libero?",
		answers: ['14 anni.', '18 anni.', '16 anni.'],
		correct_answer_index: 2
	},
	{
		id: '1004',
		section: 'NORMATIVA E LEGISLAZIONE',
		text: 'Il Certificato Medico ha normalmente validità di',
		answers: ['18 mesi.', '24 mesi.', '36 mesi.'],
		correct_answer_index: 1
	},
	{
		id: '1005',
		section: 'NORMATIVA E LEGISLAZIONE',
		text: 'La copertura assicurativa RCT è obbligatoria per la pratica del VDS/VL?',
		answers: [
			'Si, il pilota è obbligato ad assicurarsi.',
			'No, il pilota non è obbligato ad assicurarsi.',
			'Si, ma solo per effettuare voli di cross-country.'
		],
		correct_answer_index: 0
	},
	{
		id: '1006',
		section: 'NORMATIVA E LEGISLAZIONE',
		text: "Nel Volo Libero qual è il criterio generale di precedenza nell'area di decollo?",
		answers: [
			"Ha la precedenza il pilota in fase d'atterraggio (top landing).",
			'Ha la precedenza il pilota in fase di decollo.',
			'Non esiste un criterio specifico.'
		],
		correct_answer_index: 0
	},
	{
		id: '1007',
		section: 'NORMATIVA E LEGISLAZIONE',
		text: "È obbligatorio l'uso del casco per il Volo Libero?",
		answers: ['No.', 'Si.', 'Solo per il volo in deltaplano.'],
		correct_answer_index: 1
	},
	{
		id: '1008',
		section: 'NORMATIVA E LEGISLAZIONE',
		text: "Qual è lo spazio aereo all'interno del quale si può praticare il Volo Libero?",
		answers: [
			'Qualsiasi spazio aereo purché ad una quota inferiore ai 1000 piedi.',
			'Lo spazio aereo controllato dalle Autorità Aeronautiche.',
			'Lo spazio aereo non controllato, salvo particolari eccezioni o autorizzazioni sancite da un notam.'
		],
		correct_answer_index: 2
	},
	{
		id: '1009',
		section: 'NORMATIVA E LEGISLAZIONE',
		text: 'Il criterio nello stabilire la suddivisione degli spazi aerei per la pratica del volo è:',
		answers: [
			'solo quello di limitare lo spazio aereo a disposizione degli sportivi che praticano il Volo Libero, in quanto ritenuta attività secondaria.',
			'quello di separare il traffico costituito dagli apparecchi per il Volo Libero da altri traffici civili e militari per garantire la sicurezza del volo ed evitare collisioni.',
			"quello di impedire che l'attività di Volo Libero si svolga al di sopra di certe quote in quanto molto in alto gli apparecchi in uso non danno garanzie di sicurezza."
		],
		correct_answer_index: 1
	},
	{
		id: '1010',
		section: 'NORMATIVA E LEGISLAZIONE',
		text: 'Quale altezza minima si deve mantenere nella pratica del VDS/VL?',
		answers: [
			'500 piedi dal punto più elevato nel raggio di 3 km nei giorni feriali e 1000 piedi nei giorni festivi.',
			"Non vi è un'altezza minima, perché è comunque vietato il sorvolo dei centri abitati con deltaplano e parapendio.",
			"Quella che consente, in caso d'emergenza, un atterraggio che non comporti pericolo per beni e persone al suolo."
		],
		correct_answer_index: 2
	},
	{
		id: '1011',
		section: 'NORMATIVA E LEGISLAZIONE',
		text: 'Quale distanza minima occorre mantenere dalle nubi?',
		answers: [
			'1000 m.',
			'Non esiste regola precisa.',
			'È necessario comunque mantenersi fuori dalle nubi e in contatto con il suolo o con la superficie acquea sottostante.'
		],
		correct_answer_index: 2
	},
	{
		id: '1012',
		section: 'NORMATIVA E LEGISLAZIONE',
		text: 'È consentito volare in nube con deltaplano e parapendio?',
		answers: [
			'No, perché non è garantita la separazione da eventuali ostacoli, dal terreno e da altri mezzi e poiché il disorientamento comporta la possibile perdita del controllo di assetto e velocità.',
			"No, perché non è garantita la separazione da eventuali ostacoli e dal terreno, sebbene sia possibile condurre tali mezzi in condizioni di volo strumentale anche senza l'ausilio di strumenti, data la semplicità di pilotaggio.",
			'Sì, sempre che la nube in questione non si estenda sino ad aderire al pendio o comunque al terreno, nel qual caso non sarebbe garantita la sicurezza del volo.'
		],
		correct_answer_index: 0
	},
	{
		id: '1013',
		section: 'NORMATIVA E LEGISLAZIONE',
		text: "Le tabelle chiamate effemeridi, sulle quali si possono trovare tutti i dati concernenti le posizioni in cielo delle stelle e dei pianeti durante l'anno, possono essere utili a chi pratica il Volo Libero perché:",
		answers: [
			'può essere utile condurre una navigazione stellare in certe condizioni.',
			"può essere utile conoscere con esattezza l'altezza del sole sull'orizzonte a una certa ora e in un certo giorno dell'anno per stabilire la propria posizione.",
			"è indispensabile sapere l'orario del sorgere e del tramontare del sole in ogni giorno dell'anno poiché il Volo Libero si può praticare solo da 30 minuti prima dell'alba a 30 minuti dopo il tramonto."
		],
		correct_answer_index: 2
	},
	{
		id: '1014',
		section: 'NORMATIVA E LEGISLAZIONE',
		text: "E' possibile svolgere attività di volo libero a meno di 4 km dai confini di Stato?",
		answers: ['No.', 'Si.', 'Dipende dalle leggi vigenti nei Paesi confinanti.'],
		correct_answer_index: 1
	},
	{
		id: '1015',
		section: 'NORMATIVA E LEGISLAZIONE',
		text: 'Deltaplano e parapendio come sono classificati?',
		answers: [
			'Sono alianti.',
			'Sono apparecchi per il volo da diporto e sportivo.',
			'Sono aerostati.'
		],
		correct_answer_index: 1
	},
	{
		id: '1016',
		section: 'NORMATIVA E LEGISLAZIONE',
		text: "Che cosa s'intende per spazio aereo controllato?",
		answers: [
			"Una porzione di spazio aereo nazionale all'interno della quale tutto il traffico è controllato da apparecchiature radar.",
			"Una porzione di spazio aereo nazionale all'interno della quale tutto il traffico di aeromobili è controllato da apparecchiature radar militari.",
			"Una porzione di spazio aereo nazionale all'interno della quale si svolge attività di volo di aeromobili sotto la giurisdizione degli Enti di Controllo del traffico aereo civili e militari."
		],
		correct_answer_index: 2
	},
	{
		id: '1017',
		section: 'NORMATIVA E LEGISLAZIONE',
		text: 'La Legge italiana stabilisce che:',
		answers: [
			"all'interno degli spazi aerei controllati si svolga normalmente solo attività di volo di aeromobili esclusi gli apparecchi VDS/VL se non preventivamente autorizzati.",
			"all'interno degli spazi aerei controllati si svolga normalmente attività di volo di aeromobili civili e/o militari e di apparecchi VDS/VL.",
			"all'interno degli spazi aerei controllati si svolga sempre attività di volo di aeromobili civili e/o militari e nei giorni festivi anche attività di volo di apparecchi VDS/VL."
		],
		correct_answer_index: 0
	},
	{
		id: '1018',
		section: 'NORMATIVA E LEGISLAZIONE',
		text: "È consentito l'impegno degli spazi aerei controllati da parte degli apparecchi VDS/VL?",
		answers: [
			'Solo se preventivamente autorizzati.',
			'Si, se esistono condizioni di volo a vista (Visual Flight Rules).',
			'No, indipendentemente dalle condizioni esistenti.'
		],
		correct_answer_index: 0
	},
	{
		id: '1019',
		section: 'NORMATIVA E LEGISLAZIONE',
		text: "Praticando il Volo Libero a quale distanza è opportuno tenersi dagli aeroporti non situati all'interno di un ATZ?",
		answers: [
			'Ad almeno 5 km.',
			'Ad almeno 1 km.',
			'Ad almeno 5 km e a una quota non inferiore a 500 m.'
		],
		correct_answer_index: 0
	},
	{
		id: '1020',
		section: 'NORMATIVA E LEGISLAZIONE',
		text: 'Che cosa è una ATZ?',
		answers: [
			'Uno spazio aereo controllato situato intorno e sopra ad un aeroporto.',
			"Un'area destinata all'attesa degli aeromobili civili e/o militari prima dell'atterraggio sull'aeroporto di destinazione.",
			'Una zona aeroportuale di smistamento a terra del traffico di aeromobili civili e/o militari.'
		],
		correct_answer_index: 0
	},
	{
		id: '1021',
		section: 'NORMATIVA E LEGISLAZIONE',
		text: "E' consentito effettuare attività di volo libero in un'ATZ?",
		answers: [
			'Si.',
			'Sì, in assenza di traffico di aeromobili.',
			'No, salvo particolari autorizzazioni rilasciate dal Direttore di Circoscrizione Aeroportuale.'
		],
		correct_answer_index: 2
	},
	{
		id: '1022',
		section: 'NORMATIVA E LEGISLAZIONE',
		text: 'Che cosa è un CTR?',
		answers: [
			"Una porzione di spazio aereo controllato all'interno del quale si svolge attività di volo di aeromobili e i mezzi del VDS devono avere preventiva autorizzazione.",
			"Una porzione di spazio aereo, non necessariamente controllato, all'interno del quale si svolge attività di aeromobili civili e/o militari in arrivo o partenza su uno o più aeroporti.",
			"Una porzione di spazio aereo controllato riservata all'arrivo o partenza di aeromobili militari."
		],
		correct_answer_index: 0
	},
	{
		id: '1023',
		section: 'NORMATIVA E LEGISLAZIONE',
		text: "E' possibile volare con deltaplano o parapendio all'interno di un CTR?",
		answers: ['Normalmente si.', 'Si, nei giorni festivi.', 'No, salvo autorizzazione.'],
		correct_answer_index: 2
	},
	{
		id: '1024',
		section: 'NORMATIVA E LEGISLAZIONE',
		text: 'Che cosa è una TMA?',
		answers: [
			"Una porzione di spazio aereo riservata all' attività di velivoli militari.",
			'Una porzione di spazio aereo controllato.',
			'Una porzione di spazio aereo non controllato.'
		],
		correct_answer_index: 1
	},
	{
		id: '1025',
		section: 'NORMATIVA E LEGISLAZIONE',
		text: "E' ammesso il VDS/VL all'interno di una TMA?",
		answers: ['Solo se autorizzato.', 'Si.', 'Sì, ma in assenza di traffico di aeromobili.'],
		correct_answer_index: 0
	},
	{
		id: '1026',
		section: 'NORMATIVA E LEGISLAZIONE',
		text: 'Che cosa è una Aerovia o AWY?',
		answers: [
			'Una via di rullaggio a terra su un aeroporto.',
			"Una porzione di spazio aereo controllato che si estende verso l'alto da un livello posto al disopra della superficie terrestre fino ad un determinato livello superiore, a forma di corridoio.",
			'Una porzione di spazio aereo, non necessariamente controllato, in cui si svolge attività di aeromobili.'
		],
		correct_answer_index: 1
	},
	{
		id: '1027',
		section: 'NORMATIVA E LEGISLAZIONE',
		text: "È ammesso volare in deltaplano o parapendio in un'aerovia o AWY?",
		answers: ['No.', "Si, se non c'è traffico.", 'Si.'],
		correct_answer_index: 0
	},
	{
		id: '1028',
		section: 'NORMATIVA E LEGISLAZIONE',
		text: 'Che cosa è una zona P "PAPA"?',
		answers: [
			"Una porzione di spazio aereo all'interno della quale è normalmente proibito il volo a tutti gli aeromobili.",
			"Una porzione di spazio aereo all'interno della quale è permesso il volo ai soli parapendio.",
			"Una porzione di spazio aereo all'interno della quale non possono volare i soli velivoli militari."
		],
		correct_answer_index: 0
	},
	{
		id: '1029',
		section: 'NORMATIVA E LEGISLAZIONE',
		text: 'Che cosa è una zona D "DELTA"?',
		answers: [
			"Una porzione di spazio aereo all'interno della quale è permesso volare in deltaplano.",
			"Una porzione di spazio aereo all'interno della quale è pericoloso volare per tutti i tipi di aeromobile.",
			"Una porzione di spazio aereo all'interno della quale è pericoloso volare per alcuni tipi di aeromobili civili."
		],
		correct_answer_index: 1
	},
	{
		id: '1030',
		section: 'NORMATIVA E LEGISLAZIONE',
		text: 'Che cosa è una zona R "ROMEO"?',
		answers: [
			"Una porzione di spazio aereo all'interno della quale il volo è raccomandato per tutti i tipi di aeromobile.",
			"Una porzione di spazio aereo all'interno della quale il volo è vietato.",
			"Una porzione di spazio aereo all'interno della quale il VDS deve essere espressamente autorizzato poiché sono svolte specifiche attività di volo civile o militare."
		],
		correct_answer_index: 2
	},
	{
		id: '1031',
		section: 'NORMATIVA E LEGISLAZIONE',
		text: 'È possibile normalmente volare con deltaplano e parapendio all\'interno delle zone denominate nelle carte aeronautiche con le lettere P, D ("PAPA", "DELTA")?',
		answers: ['No.', 'Si, ma solo nei giorni festivi.', 'Si.'],
		correct_answer_index: 0
	},
	{
		id: '1032',
		section: 'NORMATIVA E LEGISLAZIONE',
		text: 'In termica decide il senso di rotazione:',
		answers: [
			'il pilota che per primo entra nella corrente ascensionale stabilisce il senso di rotazione.',
			'il pilota con meno esperienza deve avere la precedenza.',
			'si vira verso destra alla presenza di cumulo e verso sinistra in caso contrario.'
		],
		correct_answer_index: 0
	},
	{
		id: '1033',
		section: 'NORMATIVA E LEGISLAZIONE',
		text: 'Tra un apparecchio per il volo libero ed un apparecchio a motore, chi ha la precedenza in caso di rotte convergenti?',
		answers: [
			"L'apparecchio a motore, in quanto più veloce.",
			"L'apparecchio a motore, in quanto meno manovrabile.",
			"L'apparecchio per il volo libero."
		],
		correct_answer_index: 2
	},
	{
		id: '1034',
		section: 'NORMATIVA E LEGISLAZIONE',
		text: 'Due apparecchi VDS si trovano su rotte convergenti alla stessa quota. Come si devono comportare i rispettivi piloti?',
		answers: [
			"Uno mantiene la quota e l'altro la cambia per evitare la collisione.",
			"Quello che viene da destra continua diritto, l'altro vira per evitare la collisione.",
			"Entrambi effettuano una virata a destra mantenendo l'altro in vista per evitare la collisione."
		],
		correct_answer_index: 2
	},
	{
		id: '1035',
		section: 'NORMATIVA E LEGISLAZIONE',
		text: 'Due apparecchi per il VDS privi di motore compiono un volo di pendio e rischiano la collisione frontale. Come si comportano i rispettivi piloti?',
		answers: [
			"Quello con il pendio alla propria sinistra prosegue diritto, l'altro vira a sinistra per evitare la collisione.",
			"Quello con il pendio alla propria destra prosegue diritto, l'altro vira a destra allontanandosi dal pendio per evitare la collisione.",
			'Entrambi possono proseguire diritto, purché tengano conto di un cambio di quota per evitare la collisione.'
		],
		correct_answer_index: 1
	},
	{
		id: '1036',
		section: 'NORMATIVA E LEGISLAZIONE',
		text: 'In caso di precedenza tra un parapendio monoposto, un parapendio biposto e un deltaplano biposto:',
		answers: [
			'ha precedenza il parapendio monoposto.',
			'ha precedenza il deltaplano biposto.',
			'ha precedenza il parapendio biposto.'
		],
		correct_answer_index: 2
	},
	{
		id: '1037',
		section: 'NORMATIVA E LEGISLAZIONE',
		text: 'Qual è il criterio generale di precedenza per deltaplani e parapendio in atterraggio?',
		answers: [
			'Dare la precedenza a tutti i deltaplani o parapendio più lenti indipendentemente dalla quota cui si trovano.',
			"L'apparecchio più basso ha la precedenza.",
			'Dare la precedenza a tutti i piloti più esperti.'
		],
		correct_answer_index: 1
	},
	{
		id: '1038',
		section: 'NORMATIVA E LEGISLAZIONE',
		text: "Nel Volo Libero è obbligatoria l'assicurazione RCT del mezzo?",
		answers: ['No.', 'Si.', 'Si, ma solo se si vola in luoghi molto frequentati.'],
		correct_answer_index: 0
	},
	{
		id: '1039',
		section: 'NORMATIVA E LEGISLAZIONE',
		text: "Il riporto di un'infrazione alla vigente legge che regola l'attività di Volo Libero dovrebbe essere fatto in prima istanza alla Competente Autorità che è:",
		answers: [
			'la Polizia di Stato.',
			'la Direzione Circoscrizionale di Aeroporto.',
			'i Carabinieri.'
		],
		correct_answer_index: 1
	},
	{
		id: '1040',
		section: 'NORMATIVA E LEGISLAZIONE',
		text: "Qual è uno dei requisiti richiesti per l'uso degli apparecchi biposto VDS/VL con passeggero a bordo?",
		answers: [
			'Attestato di pilota in corso di validità e abilitazione al trasporto del passeggero.',
			'Attestato di pilota in corso di validità con esperienza di almeno 30 ore.',
			'Attestato di pilota in corso di validità, buona esperienza di volo, condizioni meteo favorevoli.'
		],
		correct_answer_index: 0
	},
	{
		id: '2001',
		section: 'AERODINAMICA',
		text: "Che cosa studia l'aerodinamica?",
		answers: [
			'Le leggi della dinamica dei fluidi.',
			'Le leggi che regolano il moto di corpi solidi immersi in un fluido gassoso.',
			"Lo spostamento delle masse d'aria nell'atmosfera terrestre."
		],
		correct_answer_index: 1
	},
	{
		id: '2002',
		section: 'AERODINAMICA',
		text: "Che cosa è un'ala?",
		answers: [
			'È un corpo di forma prestabilita che genera portanza aerodinamica in ogni condizione.',
			"È un corpo di forma appropriata che posto in movimento rispetto all'aria genera forze aerodinamiche.",
			"È un corpo di forma qualsiasi che genera solo portanza quando posto in movimento rispetto all'aria."
		],
		correct_answer_index: 1
	},
	{
		id: '2003',
		section: 'AERODINAMICA',
		text: 'Che cosa s\'intende per "profilo alare"?',
		answers: [
			"La proiezione dell'ala sul piano orizzontale.",
			"La proiezione dell'ala sul piano verticale passante per le estremità alari.",
			"La sezione di un'ala, determinata su un piano perpendicolare all'asse trasversale."
		],
		correct_answer_index: 2
	},
	{
		id: '2004',
		section: 'AERODINAMICA',
		text: 'Quali sono i più comuni tipi di profilo alare utilizzati nel VDS/VL?',
		answers: [
			'Piano convesso ed ellittico simmetrico.',
			'Cavo convesso e biconvesso simmetrico.',
			'Concavo convesso, piano convesso e biconvesso.'
		],
		correct_answer_index: 2
	},
	{
		id: '2005',
		section: 'AERODINAMICA',
		text: "Che cosa s'intende rispettivamente per bordo d'attacco e per bordo d'uscita di un'ala?",
		answers: [
			"La parte dell'ala che si attacca alla fusoliera e l'estremità alare.",
			"Il bordo esterno ed interno dell'ala.",
			"Il bordo anteriore ed il bordo posteriore di un'ala."
		],
		correct_answer_index: 2
	},
	{
		id: '2006',
		section: 'AERODINAMICA',
		text: 'Che cosa è la corda alare o aerodinamica?',
		answers: [
			"È il segmento di retta che unisce il bordo d'attacco al bordo d'uscita del profilo alare.",
			"È il segmento di retta che identifica il piano di simmetria dell'ala.",
			'È la distanza tra le due estremità alari.'
		],
		correct_answer_index: 0
	},
	{
		id: '2007',
		section: 'AERODINAMICA',
		text: "Che cosa s'intende rispettivamente per estradosso e intradosso di un'ala?",
		answers: [
			"La superficie inferiore e la superficie superiore dell'ala stessa.",
			"La superficie superiore ed inferiore dell'ala stessa.",
			"La superficie interna ed esterna dell'ala stessa."
		],
		correct_answer_index: 1
	},
	{
		id: '2008',
		section: 'AERODINAMICA',
		text: "Che cosa s'intende per apertura alare?",
		answers: [
			'La distanza tra le due estremità alari.',
			"La distanza tra bordo d'attacco e bordo d'uscita del profilo alare.",
			"La massima distanza tra estradosso ed intradosso dell'ala."
		],
		correct_answer_index: 0
	},
	{
		id: '2009',
		section: 'AERODINAMICA',
		text: "Che cosa s'intende per allungamento di un'ala?",
		answers: [
			'È la distanza tra le estremità alari.',
			'È il rapporto tra superficie alare e apertura alare.',
			"È il rapporto tra il quadrato dell'apertura alare e la superficie dell'ala."
		],
		correct_answer_index: 2
	},
	{
		id: '2010',
		section: 'AERODINAMICA',
		text: "Quant'è l'allungamento di un'ala di 25 m² di superficie dotata di un'apertura alare di 10 m?",
		answers: ['4 (quattro).', '2.5 (due virgola cinque).', '6.25 (sei virgola venticinque).'],
		correct_answer_index: 0
	},
	{
		id: '2011',
		section: 'AERODINAMICA',
		text: "Quali sono gli assi attorno ai quali si muove un'ala?",
		answers: [
			'Quello longitudinale e quello verticale.',
			'Quello longitudinale, quello trasversale e quello verticale.',
			'Quello longitudinale e quello trasversale.'
		],
		correct_answer_index: 1
	},
	{
		id: '2012',
		section: 'AERODINAMICA',
		text: "Come si chiama il movimento di un'ala rispetto al suo asse longitudinale?",
		answers: ['Rollio.', 'Imbardata.', 'Beccheggio.'],
		correct_answer_index: 0
	},
	{
		id: '2013',
		section: 'AERODINAMICA',
		text: "Come si chiama il movimento di un'ala rispetto al suo asse trasversale?",
		answers: ['Rollio.', 'Imbardata.', 'Beccheggio.'],
		correct_answer_index: 2
	},
	{
		id: '2014',
		section: 'AERODINAMICA',
		text: "Come si chiama il movimento di un'ala rispetto al suo asse verticale?",
		answers: ['Rollio.', 'Imbardata.', 'Beccheggio.'],
		correct_answer_index: 1
	},
	{
		id: '2015',
		section: 'AERODINAMICA',
		text: 'L\'ala può essere considerata una "macchina"?',
		answers: [
			'No, perché priva di particolari meccanismi.',
			'Solo se dotata di superfici mobili.',
			'Si, perché trasforma un tipo di energia in energia di tipo diverso.'
		],
		correct_answer_index: 2
	},
	{
		id: '2016',
		section: 'AERODINAMICA',
		text: "Il movimento di un'ala:",
		answers: [
			'perturba l\'aria circostante all\'interno del cosiddetto "tubo di flusso".',
			"non disturba l'aria circostante.",
			'perturba l\'aria circostante, ma solo al di fuori di un "tubo di flusso".'
		],
		correct_answer_index: 0
	},
	{
		id: '2017',
		section: 'AERODINAMICA',
		text: 'Per quale motivo parlando di aerodinamica è necessario fare riferimento al "tubo di flusso"?',
		answers: [
			'Perché si usa fare così in fisica.',
			'Perché gli esperimenti in galleria del vento sono effettuati in un locale a forma di tubo.',
			'Perché le leggi dell\'aerodinamica che regolano il volo valgono all\'interno appunto di un tubo ideale detto "tubo di flusso".'
		],
		correct_answer_index: 2
	},
	{
		id: '2018',
		section: 'AERODINAMICA',
		text: 'Che cosa è un "tubo di flusso"?',
		answers: [
			"La porzione di aria perturbata dal passaggio di un'ala.",
			"Un congegno per la misura della velocità di un'ala.",
			"La zona interessata dalla sola scia di un'ala in movimento."
		],
		correct_answer_index: 0
	},
	{
		id: '2019',
		section: 'AERODINAMICA',
		text: 'All\'interno di un "tubo di flusso":',
		answers: [
			'la presenza di un solido perturba comunque il flusso del fluido.',
			'la presenza di un solido opportunamente profilato non disturba il flusso di un fluido.',
			'la presenza di un solido determina necessariamente una variazione di portata.'
		],
		correct_answer_index: 0
	},
	{
		id: '2020',
		section: 'AERODINAMICA',
		text: "Un profilo investito da aria in movimento determina gli stessi effetti aerodinamici di un profilo che si muove nell'aria?",
		answers: [
			'No, indipendentemente dalla velocità e direzione del movimento relativo.',
			'Si, ma solo se coincidono velocità e direzione del movimento relativo.',
			'Dipende solamente dalla forma del corpo solido.'
		],
		correct_answer_index: 1
	},
	{
		id: '2021',
		section: 'AERODINAMICA',
		text: 'Che cosa è il vento relativo?',
		answers: [
			"La differenza di velocità dell'aria che si riscontra sulle due semiali in virata.",
			"Il vento incontrato dall'ala in quanto in movimento o il movimento relativo dell'aria rispetto all'ala.",
			"La differenza di velocità dell'aria su estradosso ed intradosso dell'ala in volo."
		],
		correct_answer_index: 1
	},
	{
		id: '2022',
		section: 'AERODINAMICA',
		text: "La velocità di cui è dotata un'ala e le forze a essa applicate quando vola sono:",
		answers: [
			"grandezze fisiche rappresentabili con vettori (con direzione, verso, intensità e punto d'applicazione definiti) che si possono comporre o scomporre tra loro.",
			'grandezze fisiche che non si possono rappresentare graficamente ma che possono sommarsi e sottrarsi geometricamente.',
			'grandezze numeriche semplici con le quali è quindi possibile effettuare qualsiasi operazione.'
		],
		correct_answer_index: 0
	},
	{
		id: '2023',
		section: 'AERODINAMICA',
		text: "Quando si parla di pressione di un fluido su una superficie che cosa s'intende?",
		answers: [
			'È il prodotto della superficie per la forza che il fluido esercita sulla stessa.',
			'È il rapporto tra la forza che il fluido esercita sulla superficie e il quadrato della superficie stessa.',
			"È la forza che il fluido stesso esercita sull'unità di superficie."
		],
		correct_answer_index: 2
	},
	{
		id: '2024',
		section: 'AERODINAMICA',
		text: "La pressione di un fluido in movimento all'interno di un tubo di flusso è la somma di:",
		answers: [
			'pressione dinamica e peso del fluido.',
			'pressione dinamica e pressione statica.',
			'pressione statica e portata del tubo di flusso.'
		],
		correct_answer_index: 1
	},
	{
		id: '2025',
		section: 'AERODINAMICA',
		text: 'Che cosa è la pressione statica di un fluido?',
		answers: [
			'È il rapporto tra peso e velocità del fluido.',
			'È il rapporto tra peso e densità del fluido.',
			"È il peso della colonna di fluido che insiste sull'unità di superficie."
		],
		correct_answer_index: 2
	},
	{
		id: '2026',
		section: 'AERODINAMICA',
		text: 'Che cosa è la pressione dinamica di un fluido?',
		answers: [
			'È il rapporto tra la velocità di un fluido in movimento e la sua densità.',
			'È il rapporto tra la velocità di un fluido in movimento e la superficie del solido immerso in esso.',
			'È la pressione che un fluido esercita sulla superficie di un solido immerso in esso per effetto della velocità di scorrimento.'
		],
		correct_answer_index: 2
	},
	{
		id: '2027',
		section: 'AERODINAMICA',
		text: 'Che cosa rappresenta l\'espressione "1/2 p V2"?',
		answers: [
			"La densità dell'aria ad una certa velocità.",
			'La pressione statica di un fluido la cui densità è pari a "p".',
			'La pressione dinamica di un fluido la cui densità è pari a "p" e la cui velocità è pari a "V".'
		],
		correct_answer_index: 2
	},
	{
		id: '2028',
		section: 'AERODINAMICA',
		text: 'La portanza e la resistenza sono direttamente proporzionali:',
		answers: ['alla pressione statica.', 'alla pressione dinamica.', 'alla pressione totale.'],
		correct_answer_index: 1
	},
	{
		id: '2029',
		section: 'AERODINAMICA',
		text: 'I filetti fluidi che incontrano un profilo alare generando portanza, con quale principale differenza scorrono sulle superfici?',
		answers: ['Differenza di velocità.', 'Differenza di densità.', 'Differenza molecolare.'],
		correct_answer_index: 0
	},
	{
		id: '2030',
		section: 'AERODINAMICA',
		text: "La velocità dell'aria su un'ala in volo è:",
		answers: [
			"maggiore sull'estradosso.",
			"maggiore sull'intradosso.",
			"identica sulle due superfici dell'ala."
		],
		correct_answer_index: 0
	},
	{
		id: '2031',
		section: 'AERODINAMICA',
		text: 'Un profilo in volo genera una pressione dinamica:',
		answers: [
			"maggiore sull'estradosso.",
			"minore sull'estradosso.",
			"identica sulle due superfici dell'ala."
		],
		correct_answer_index: 0
	},
	{
		id: '2032',
		section: 'AERODINAMICA',
		text: 'Un profilo in volo genera una pressione statica:',
		answers: [
			"identica sulle due superfici dell'ala.",
			"maggiore sull'estradosso.",
			"minore sull'estradosso."
		],
		correct_answer_index: 2
	},
	{
		id: '2033',
		section: 'AERODINAMICA',
		text: 'La legge di Bernoulli dice:',
		answers: [
			'che la somma della pressione statica e dinamica del fluido non è costante.',
			'che la somma della pressione statica e dinamica del fluido è costante.',
			"che l'andamento della pressione statica del fluido non dipende da quello della pressione dinamica dello stesso."
		],
		correct_answer_index: 1
	},
	{
		id: '2034',
		section: 'AERODINAMICA',
		text: 'Che cosa mette in evidenza la legge di Bernoulli in un tubo di Venturi a portata costante?',
		answers: [
			'Che variando la sezione del tubo, pressione e velocità del fluido rimangono invariate.',
			'Che variando la sezione del tubo, varia solo la pressione dinamica del fluido.',
			'Che variando la sezione del tubo variano velocità, pressione statica e pressione dinamica. La pressione totale non varia.'
		],
		correct_answer_index: 2
	},
	{
		id: '2035',
		section: 'AERODINAMICA',
		text: 'In un tubo di Venturi avente portata costante, al variare della sezione:',
		answers: [
			'la velocità del fluido varia.',
			'la velocità del fluido non varia.',
			'la pressione totale del fluido varia.'
		],
		correct_answer_index: 0
	},
	{
		id: '2036',
		section: 'AERODINAMICA',
		text: 'In un tubo di Venturi avente portata costante la somma della pressione statica e della pressione dinamica del fluido (pressione totale):',
		answers: [
			'è variabile al variare della sezione.',
			'è costante al variare della sezione.',
			'dipende dalla densità del fluido.'
		],
		correct_answer_index: 1
	},
	{
		id: '2037',
		section: 'AERODINAMICA',
		text: "All'interno di un tubo di flusso a portata costante, se la sezione diminuisce:",
		answers: [
			'la velocità del fluido aumenta e la sua pressione dinamica diminuisce.',
			'la velocità del fluido aumenta e la sua pressione dinamica aumenta.',
			'la velocità del fluido aumenta e quindi la pressione totale varia.'
		],
		correct_answer_index: 1
	},
	{
		id: '2038',
		section: 'AERODINAMICA',
		text: "All'interno di un tubo di flusso a portata costante dove la sezione aumenta:",
		answers: [
			'la velocità del fluido diminuisce e la sua pressione statica aumenta.',
			'la velocità del fluido diminuisce e la sua pressione statica diminuisce.',
			'la velocità del fluido diminuisce e quindi la pressione totale varia.'
		],
		correct_answer_index: 0
	},
	{
		id: '2039',
		section: 'AERODINAMICA',
		text: "L'ala di un deltaplano o di un parapendio utilizza il principio di Bernoulli applicato a un tubo Venturi?",
		answers: ['Si, ma non nel volo in termica.', 'Si.', 'No.'],
		correct_answer_index: 1
	},
	{
		id: '2040',
		section: 'AERODINAMICA',
		text: 'I profili del deltaplano e del parapendio sono principalmente di tipo:',
		answers: ['biconvesso simmetrico.', 'piano-convesso.', 'concavo-convesso o biconvesso.'],
		correct_answer_index: 2
	},
	{
		id: '2041',
		section: 'AERODINAMICA',
		text: 'Che cosa è la risultante aerodinamica?',
		answers: [
			"È la risultante di tutte le forze prodotte dall'ala in movimento rispetto all'aria.",
			'È la risultante o somma vettoriale del peso e della portanza.',
			'È una forza sempre diretta perpendicolarmente alla traiettoria di volo.'
		],
		correct_answer_index: 0
	},
	{
		id: '2042',
		section: 'AERODINAMICA',
		text: 'La risultante aerodinamica è una forza:',
		answers: [
			'perpendicolare alla traiettoria di volo o al vento relativo.',
			'sempre parallela alla traiettoria di volo o al vento relativo.',
			"diretta verso l'alto e per questo in grado di contrastare la forza peso."
		],
		correct_answer_index: 2
	},
	{
		id: '2043',
		section: 'AERODINAMICA',
		text: 'La risultante aerodinamica si scompone in portanza e resistenza. Esse sono rispettivamente:',
		answers: [
			'la portanza perpendicolare alla corda alare e la resistenza parallela alla corda alare.',
			'la portanza perpendicolare alla traiettoria di volo od alla direzione del vento relativo, la resistenza parallela ad esse.',
			'la portanza parallela al vento relativo od alla traiettoria di volo, la resistenza perpendicolare ad essi.'
		],
		correct_answer_index: 1
	},
	{
		id: '2044',
		section: 'AERODINAMICA',
		text: 'Se un profilo alare è investito da un vento relativo, si può sempre affermare che:',
		answers: [
			'si genera portanza.',
			'non si genera portanza senza che si generi resistenza.',
			'la resistenza generata dipende unicamente dalla forma del profilo.'
		],
		correct_answer_index: 1
	},
	{
		id: '2045',
		section: 'AERODINAMICA',
		text: 'Nel volo del deltaplano e del parapendio:',
		answers: [
			'la resistenza è uguale e opposta alla velocità sulla traiettoria.',
			'la resistenza a velocità costante, è uguale e opposta alla componente del peso lungo la traiettoria.',
			'la portanza e la resistenza si equilibrano.'
		],
		correct_answer_index: 1
	},
	{
		id: '2046',
		section: 'AERODINAMICA',
		text: 'La resistenza è una forza aerodinamica che può essere considerata:',
		answers: [
			'sempre perpendicolare alla traiettoria di volo.',
			'sempre parallela alla corda aerodinamica.',
			'sempre parallela alla traiettoria di volo o alla direzione del vento relativo.'
		],
		correct_answer_index: 2
	},
	{
		id: '2047',
		section: 'AERODINAMICA',
		text: 'Qual è la formula della resistenza?',
		answers: ['R=1/2 p S C V2', 'R=1/2 p S² Cr V', 'R=1/2 p SCV'],
		correct_answer_index: 0
	},
	{
		id: '2048',
		section: 'AERODINAMICA',
		text: "In quale modo varia la resistenza aerodinamica di un'ala variando la densità dell'aria e la superficie dell'ala stessa?",
		answers: [
			'Non varia in alcun modo.',
			'Varia proporzionalmente.',
			'Varia in modo inversamente proporzionale.'
		],
		correct_answer_index: 1
	},
	{
		id: '2049',
		section: 'AERODINAMICA',
		text: 'Di quanto varia la resistenza aerodinamica di un profilo alare triplicandone la velocità:',
		answers: ['del triplo.', 'non varia.', 'diviene nove volte più grande.'],
		correct_answer_index: 2
	},
	{
		id: '2050',
		section: 'AERODINAMICA',
		text: 'Che cosa è il Cr?',
		answers: [
			'Un coefficiente numerico che dipende dal carico alare.',
			'Un coefficiente numerico che dipende dalla forma del profilo e dalla sua incidenza di volo.',
			'Una forza che dipende dalla forma del profilo e dalla sua incidenza di volo.'
		],
		correct_answer_index: 1
	},
	{
		id: '2051',
		section: 'AERODINAMICA',
		text: "Da quali tipi di resistenza è composta la resistenza aerodinamica di un'ala di deltaplano o parapendio?",
		answers: [
			'Dalla resistenza di attrito, da quella di forma e da quella indotta.',
			'Dalla resistenza di forma e da quella indotta.',
			'Dalla resistenza di attrito e da quella di forma.'
		],
		correct_answer_index: 0
	},
	{
		id: '2052',
		section: 'AERODINAMICA',
		text: 'Che cosa è la resistenza di forma?',
		answers: [
			'È la parte di resistenza dovuta alla forma più o meno aerodinamica di un corpo.',
			'È la parte di resistenza dovuta alle dimensioni del corpo indipendentemente dalla forma aerodinamica dello stesso.',
			'È una forza il cui valore può essere nullo se la forma del corpo è molto aerodinamica.'
		],
		correct_answer_index: 0
	},
	{
		id: '2053',
		section: 'AERODINAMICA',
		text: 'Su quale tipo di resistenza influisce principalmente lo spessore del profilo alare?',
		answers: [
			'Sulla resistenza di attrito.',
			'Sulla resistenza indotta.',
			'Sulla resistenza di forma.'
		],
		correct_answer_index: 2
	},
	{
		id: '2054',
		section: 'AERODINAMICA',
		text: 'La resistenza di forma:',
		answers: [
			"aumenta all'aumentare della velocità.",
			"diminuisce all'aumentare della velocità.",
			'non varia al variare della velocità.'
		],
		correct_answer_index: 0
	},
	{
		id: '2055',
		section: 'AERODINAMICA',
		text: 'Che cosa è la resistenza di attrito?',
		answers: [
			"È la parte di resistenza dovuta alle dimensioni dell'ala.",
			"È la parte di resistenza dovuta all'attrito dell'aria sulla superficie dell'ala.",
			'È la parte di resistenza dovuta alla presenza inevitabile dei vortici marginali.'
		],
		correct_answer_index: 1
	},
	{
		id: '2056',
		section: 'AERODINAMICA',
		text: "Che cosa s'intende per strato limite?",
		answers: [
			"Lo strato d'aria compreso tra superficie alare e superficie interna del tubo di flusso in cui vola l'ala.",
			"Lo strato d'aria immediatamente esterno al tubo di flusso in cui è immersa l'ala.",
			"Lo strato d'aria più prossimo all'ala compreso tra la superficie alare e lo strato nel quale la velocità del vento relativo è quella di regime."
		],
		correct_answer_index: 2
	},
	{
		id: '2057',
		section: 'AERODINAMICA',
		text: "La resistenza d'attrito:",
		answers: [
			'dipende anche dalla natura dello strato limite.',
			'non dipende dalla natura dello strato limite.',
			"dipende dalla forma e dalle dimensioni dell'ala."
		],
		correct_answer_index: 0
	},
	{
		id: '2058',
		section: 'AERODINAMICA',
		text: "Come varia la resistenza d'attrito al variare della velocità?",
		answers: [
			'Aumenta al diminuire della velocità.',
			"Aumenta all'aumentare della velocità.",
			'Rimane costante al variare della velocità.'
		],
		correct_answer_index: 1
	},
	{
		id: '2059',
		section: 'AERODINAMICA',
		text: 'Che cosa è la resistenza indotta?',
		answers: [
			"È la parte di resistenza dovuta al prodursi dei vortici marginali o d'estremità alare.",
			"È la parte di resistenza dovuta all'attrito dell'aria sulla superficie alare.",
			"È la parte di resistenza dovuta alla forma e alle dimensioni dell'ala."
		],
		correct_answer_index: 0
	},
	{
		id: '2060',
		section: 'AERODINAMICA',
		text: 'La resistenza indotta è originata:',
		answers: [
			"dall'attrito dell'aria sulla superficie alare che produce i vortici marginali.",
			"dallo spessore più o meno rilevante dell'ala che oltre certi valori produce vortici marginali.",
			"dalla differenza di pressione statica sotto e sopra l'ala."
		],
		correct_answer_index: 2
	},
	{
		id: '2061',
		section: 'AERODINAMICA',
		text: "E' vero che la resistenza indotta dipende dall'allungamento alare?",
		answers: [
			'Si e da nessun altro parametro o fattore.',
			"Si, anche da esso ed è minore quando è maggiore l'allungamento.",
			'No.'
		],
		correct_answer_index: 1
	},
	{
		id: '2062',
		section: 'AERODINAMICA',
		text: 'La resistenza indotta varia al variare della velocità?',
		answers: [
			"Si, aumenta all'aumentare della velocità.",
			'No.',
			"Si, diminuisce all'aumentare della velocità."
		],
		correct_answer_index: 2
	},
	{
		id: '2063',
		section: 'AERODINAMICA',
		text: "A parità di altre condizioni un'ala con allungamento maggiore:",
		answers: ['è più efficiente.', 'è meno efficiente.', 'è più resistente.'],
		correct_answer_index: 0
	},
	{
		id: '2064',
		section: 'AERODINAMICA',
		text: "Lo scopo principale per cui si tende ad aumentare l'allungamento è:",
		answers: [
			'ottenere minore resistenza di forma.',
			"ottenere minore resistenza d'attrito.",
			'ottenere minore resistenza indotta.'
		],
		correct_answer_index: 2
	},
	{
		id: '2065',
		section: 'AERODINAMICA',
		text: "L'unica resistenza che diminuisce all'aumentare della velocità è:",
		answers: ["quella d'attrito.", 'quella indotta.', 'quella di forma.'],
		correct_answer_index: 1
	},
	{
		id: '2066',
		section: 'AERODINAMICA',
		text: 'In che modo la resistenza aerodinamica è proporzionale alla velocità?',
		answers: ['Direttamente.', 'Inversamente.', 'Direttamente e al quadrato della stessa.'],
		correct_answer_index: 2
	},
	{
		id: '2067',
		section: 'AERODINAMICA',
		text: 'Diminuendo la resistenza aerodinamica di un profilo a parità di altre condizioni si ottiene:',
		answers: [
			'un miglioramento delle prestazioni con una maggiore efficienza.',
			'solo una maggiore velocità massima.',
			'solo un minor tasso minimo di caduta.'
		],
		correct_answer_index: 0
	},
	{
		id: '2068',
		section: 'AERODINAMICA',
		text: "La resistenza aerodinamica varia al variare dell'angolo d'incidenza?",
		answers: ['No.', 'Si, ma solo in virata.', 'Si.'],
		correct_answer_index: 2
	},
	{
		id: '2069',
		section: 'AERODINAMICA',
		text: 'Si può diminuire la resistenza aerodinamica sino a ridurla a zero in volo?',
		answers: ["Si, variando opportunamente l'angolo d'incidenza", 'Si, in almeno due modi', 'No'],
		correct_answer_index: 2
	},
	{
		id: '2070',
		section: 'AERODINAMICA',
		text: 'Adottando un profilo sottilissimo:',
		answers: [
			'la resistenza assume valore zero con incidenza zero.',
			'la resistenza non si annulla comunque.',
			'la resistenza si annulla se la superficie alare è perfettamente levigata.'
		],
		correct_answer_index: 1
	},
	{
		id: '2071',
		section: 'AERODINAMICA',
		text: "Che cos'è la portanza?",
		answers: [
			'È una forza ed è la componente della risultante aerodinamica, parallela alla direzione del vento relativo o alla traiettoria di volo.',
			'È una forza ed è la componente orizzontale della risultante aerodinamica.',
			'È una forza ed è la componente della risultante aerodinamica perpendicolare alla traiettoria di volo o alla direzione del vento relativo.'
		],
		correct_answer_index: 2
	},
	{
		id: '2072',
		section: 'AERODINAMICA',
		text: 'La portanza, in un profilo convenzionale, è generata prevalentemente:',
		answers: [
			"dalla diminuzione di pressione statica in corrispondenza dell'estradosso.",
			"dalla diminuzione di pressione dinamica in corrispondenza dell'estradosso.",
			"dall'aumento di pressione statica sull'estradosso."
		],
		correct_answer_index: 0
	},
	{
		id: '2073',
		section: 'AERODINAMICA',
		text: "La portanza di un'ala dipende:",
		answers: [
			"dal suo disegno, dalla densità dell'aria, dalla superficie alare, dalla velocità con cui si muove e dalla sua incidenza.",
			"dal suo disegno e dall'incidenza solamente.",
			"dall'incidenza solamente."
		],
		correct_answer_index: 0
	},
	{
		id: '2074',
		section: 'AERODINAMICA',
		text: 'Qual è la formula della portanza?',
		answers: ['P= 1/2 p S² Cp V', 'P= 1/2 p S CP V2', 'P 1/2 p S Cp V'],
		correct_answer_index: 1
	},
	{
		id: '2075',
		section: 'AERODINAMICA',
		text: 'Nella formula della portanza il fattore Cp detto coefficiente di portanza è:',
		answers: [
			'una forza perpendicolare alla traiettoria di volo o alla direzione del vento relativo.',
			"una velocità che dipende dall'incidenza del profilo.",
			"un fattore numerico che dipende dal disegno e dall'incidenza del profilo."
		],
		correct_answer_index: 2
	},
	{
		id: '2076',
		section: 'AERODINAMICA',
		text: 'Lo spessore del profilo influisce normalmente sul valore della portanza e della resistenza che esso genera?',
		answers: [
			"Si, la portanza mediamente aumenta mentre la resistenza diminuisce con l'aumentare dello spessore.",
			"Si, portanza e resistenza aumentano a parità di altre condizioni con l'aumentare dello spessore.",
			"Si, la portanza diminuisce mentre la resistenza mediamente aumenta con l'aumentare dello spessore."
		],
		correct_answer_index: 1
	},
	{
		id: '2077',
		section: 'AERODINAMICA',
		text: "La portanza e la resistenza dipendono anche dalla densità dell'aria?",
		answers: ['Si.', 'No.', 'Non sempre.'],
		correct_answer_index: 0
	},
	{
		id: '2078',
		section: 'AERODINAMICA',
		text: "Che cosa è l'angolo d'incidenza?",
		answers: [
			"È l'angolo compreso tra la corda alare e la direzione del vento relativo o traiettoria di volo.",
			"È l'angolo compreso tra la corda alare e il piano orizzontale passante per il centro di pressione.",
			"È l'angolo compreso tra la corda alare e la direzione del vento meteorologico quando l'ala è in movimento."
		],
		correct_answer_index: 0
	},
	{
		id: '2079',
		section: 'AERODINAMICA',
		text: "L'assetto di un profilo rappresenta un'entità angolare ben distinta dall'incidenza. Esso è per definizione:",
		answers: [
			"l'angolo compreso tra la corda alare ed il piano orizzontale.",
			"l'angolo compreso tra la corda alare e la direzione del vento relativo o traiettoria di volo.",
			"l'angolo compreso tra la direzione del vento relativo o traiettoria di volo ed il piano orizzontale."
		],
		correct_answer_index: 0
	},
	{
		id: '2080',
		section: 'AERODINAMICA',
		text: "Se un profilo alare vola con un assetto di +6° e un'incidenza di +10° la sua traiettoria è:",
		answers: [
			"ascendente e inclinata verso l'alto rispetto al piano orizzontale di 4°.",
			'discendente e inclinata verso il basso rispetto al piano orizzontale di 4°.',
			'orizzontale.'
		],
		correct_answer_index: 1
	},
	{
		id: '2081',
		section: 'AERODINAMICA',
		text: 'In volo incidenza e assetto di un profilo coinciderebbero:',
		answers: [
			'qualora la traiettoria di volo fosse orizzontale in aria calma.',
			'qualora la traiettoria di volo fosse orizzontale.',
			'qualora la traiettoria di volo fosse curvilinea.'
		],
		correct_answer_index: 0
	},
	{
		id: '2082',
		section: 'AERODINAMICA',
		text: "Perché nella formula della resistenza R= 1/2 Cr S V² non compare l'angolo d'incidenza al cui variare varia la resistenza stessa?",
		answers: [
			"Perché al variare dell'incidenza varia la sola superficie proiettata.",
			"Perché un'altra formula lega incidenza e resistenza aerodinamica.",
			"Perché al variare dell'incidenza varia il Cr."
		],
		correct_answer_index: 2
	},
	{
		id: '2083',
		section: 'AERODINAMICA',
		text: "Per aumentare la portanza di un certo profilo alare è sufficiente aumentare l'angolo d'incidenza?",
		answers: [
			'Si, senza alcuna limitazione.',
			'Si, da zero a venti gradi.',
			'Si, ma entro ben precisi limiti.'
		],
		correct_answer_index: 2
	},
	{
		id: '2084',
		section: 'AERODINAMICA',
		text: "Variando l'incidenza di un profilo la portanza:",
		answers: ['varia.', 'non varia.', 'varia mentre la resistenza non varia.'],
		correct_answer_index: 0
	},
	{
		id: '2085',
		section: 'AERODINAMICA',
		text: "Perché nella formula della portanza P= 1/2 CD S V2 non compare l'angolo d'incidenza al cui variare varia la portanza stessa?",
		answers: [
			"Perché al variare dell'incidenza varia la sola superficie proiettata.",
			"Perché un'altra formula lega incidenza e portanza.",
			"Perché al variare dell'incidenza varia il CD."
		],
		correct_answer_index: 2
	},
	{
		id: '2086',
		section: 'AERODINAMICA',
		text: 'Come può in volo il pilota variare la portanza?',
		answers: [
			'Diminuendo la resistenza aerodinamica.',
			"Variando l'angolo d'incidenza entro certi limiti.",
			'Mantenendo lo stesso angolo di assetto.'
		],
		correct_answer_index: 1
	},
	{
		id: '2087',
		section: 'AERODINAMICA',
		text: 'Il peso del sistema ala-pilota, cui durante il volo si oppone la risultante aerodinamica, è una forza verticale diretta verso il basso, che si scompone in:',
		answers: [
			'trazione nella direzione della traiettoria di volo e peso apparente perpendicolarmente alla stessa.',
			'trazione perpendicolarmente alla traiettoria di volo e peso apparente nella direzione della stessa.',
			'trazione nella direzione della traiettoria di volo e peso apparente in direzione opposta.'
		],
		correct_answer_index: 0
	},
	{
		id: '2088',
		section: 'AERODINAMICA',
		text: "L'energia motrice nel volo in deltaplano e parapendio è fornita:",
		answers: ['da forze di natura aerodinamica.', 'dalla forza peso.', "dall'inerzia cinetica."],
		correct_answer_index: 1
	},
	{
		id: '2089',
		section: 'AERODINAMICA',
		text: "Come si chiama l'energia sfruttata dal sistema ala pilota in volo planato?",
		answers: ['Energia termica.', 'Energia endotermica.', 'Energia potenziale.'],
		correct_answer_index: 2
	},
	{
		id: '2090',
		section: 'AERODINAMICA',
		text: 'Che cosa è la trazione nel volo planato?',
		answers: [
			'È una forza ed è la componente del peso orientata nella direzione della traiettoria di volo.',
			'È una forza ed è la componente del peso orientata perpendicolarmente alla traiettoria di volo.',
			'È una forza che varia al variare della pendenza della traiettoria, ma è indipendente dal peso.'
		],
		correct_answer_index: 0
	},
	{
		id: '2091',
		section: 'AERODINAMICA',
		text: "Com'è possibile variare il valore della trazione in volo?",
		answers: [
			'Non può essere variato.',
			'Variando la pendenza della traiettoria di volo.',
			'Variando la sola resistenza aerodinamica.'
		],
		correct_answer_index: 1
	},
	{
		id: '2092',
		section: 'AERODINAMICA',
		text: 'In volo librato rettilineo uniforme il peso apparente, che costituisce la componente del peso perpendicolare alla traiettoria di volo, è equilibrato dalla:',
		answers: ['resistenza.', 'trazione.', 'portanza.'],
		correct_answer_index: 2
	},
	{
		id: '2093',
		section: 'AERODINAMICA',
		text: "In virata come variano il peso apparente e la superficie proiettata dell'ala?",
		answers: [
			"Aumentano entrambi, il peso apparente a causa dell'accelerazione centripeta, la superficie proiettata per motivi geometrici.",
			"Aumenta il peso apparente a causa dell'accelerazione centrifuga e diminuisce la superficie proiettata per motivi geometrici.",
			'Non variano né il peso apparente né la superficie proiettata.'
		],
		correct_answer_index: 1
	},
	{
		id: '2094',
		section: 'AERODINAMICA',
		text: "In virata a causa della forza centrifuga e dell'inclinazione laterale:",
		answers: [
			'il peso apparente è maggiore e la superficie proiettata è minore.',
			'il peso è minore e la superficie é minore.',
			'la resistenza aerodinamica è minore.'
		],
		correct_answer_index: 0
	},
	{
		id: '2095',
		section: 'AERODINAMICA',
		text: "Che cosa s'intende per carico alare?",
		answers: [
			"Il rapporto tra il peso sostentato dall'ala e la superficie della stessa.",
			"Il rapporto tra la superficie dell'ala ed il peso sostentato dalla stessa.",
			"Il carico di rottura dell'ala."
		],
		correct_answer_index: 0
	},
	{
		id: '2096',
		section: 'AERODINAMICA',
		text: "Se il pilota pesa 78 kg, l'attrezzatura di volo, ala compresa, 22 kg e la superficie proiettata è 25 m², quanto sarà il carico alare?",
		answers: ['6 kg/m².', '9 kg/m²', '4 kg/m²'],
		correct_answer_index: 2
	},
	{
		id: '2097',
		section: 'AERODINAMICA',
		text: 'Se a seguito di una parziale "chiusura" del parapendio la sua superficie alare si riduce:',
		answers: [
			'il carico alare rimane lo stesso.',
			'il carico alare aumenta.',
			'il carico alare si riduce.'
		],
		correct_answer_index: 1
	},
	{
		id: '2098',
		section: 'AERODINAMICA',
		text: "Che cosa s'intende per fattore di carico?",
		answers: [
			"Un fattore numerico capace di indicare quante volte il peso del sistema ala-pilota varia per effetto dell'accelerazione centrifuga in virata o di altre accelerazioni positive o negative durante le manovre.",
			'Un fattore numerico capace di indicare di quante volte aumenta la resistenza aerodinamica in virata per effetto della forza centrifuga.',
			'Un fattore numerico caratteristico di un tipo di deltaplano o parapendio collegato alla robustezza delle sue strutture verificata in tutti i tipi di manovra in volo.'
		],
		correct_answer_index: 0
	},
	{
		id: '2099',
		section: 'AERODINAMICA',
		text: 'Durante una virata al sistema ala-pilota viene applicata, per effetto della forza centrifuga, un\'accelerazione pari a due "G". Si può affermare che:',
		answers: [
			'il fattore il carico rimane invariato.',
			'il fattore di carico è raddoppiato, ma è come se il peso del sistema fosse invariato.',
			'il fattore di carico è raddoppiato ed è come se il peso del sistema fosse doppio.'
		],
		correct_answer_index: 2
	},
	{
		id: '2100',
		section: 'AERODINAMICA',
		text: 'Se durante il volo per qualche motivo il fattore di carico raddoppia, il carico alare',
		answers: ['può anche rimanere invariato.', 'raddoppia.', 'viene dimezzato.'],
		correct_answer_index: 1
	},
	{
		id: '2101',
		section: 'AERODINAMICA',
		text: "Che cosa s'intende per centro di pressione o di spinta?",
		answers: [
			'È il punto di applicazione della forza peso.',
			"È il punto in cui sempre s'incrociano i tre assi dell'ala, quello di beccheggio di rollio e d'imbardata.",
			"È il punto di applicazione della risultante di tutte le forze aerodinamiche generate dall'ala in movimento nell'aria."
		],
		correct_answer_index: 2
	},
	{
		id: '2102',
		section: 'AERODINAMICA',
		text: 'In volo può variare la posizione del centro di pressione?',
		answers: [
			'No, perché non dipende da fattori che variano in volo.',
			'Si, ma solo per certi tipi di profilo.',
			"Si, al variare dell'angolo d'incidenza."
		],
		correct_answer_index: 2
	},
	{
		id: '2103',
		section: 'AERODINAMICA',
		text: "Come varia mediamente la posizione del centro di pressione al variare dell'incidenza su profili autostabili?",
		answers: [
			"Diminuendo l'incidenza il centro di pressione avanza ed aumentando l'incidenza il centro di pressione arretra.",
			"Diminuendo l'incidenza il centro di pressione arretra ed aumentando l'incidenza il centro di pressione avanza.",
			"Al variare dell'incidenza il centro di pressione non si sposta."
		],
		correct_answer_index: 0
	},
	{
		id: '2104',
		section: 'AERODINAMICA',
		text: "Che cosa s'intende per baricentro di un apparecchio?",
		answers: [
			'Il punto di applicazione della forza peso.',
			'Il punto di applicazione della risultante aerodinamica.',
			"Il punto di intersezione degli assi dell'apparecchio."
		],
		correct_answer_index: 0
	},
	{
		id: '2105',
		section: 'AERODINAMICA',
		text: 'Dove si trova normalmente il baricentro?',
		answers: [
			'Coincide con il baricentro del solo pilota.',
			'Si trova tra il baricentro del pilota e quello della struttura.',
			"Si trova nel punto d'intersezione degli assi del sistema."
		],
		correct_answer_index: 1
	},
	{
		id: '2106',
		section: 'AERODINAMICA',
		text: 'La posizione del baricentro si sposta',
		answers: [
			"solo a seguito di manovre attorno all'asse trasversale.",
			"solo a seguito di manovre attorno all'asse longitudinale.",
			"sia a seguito di manovre attorno all'asse trasversale che longitudinale."
		],
		correct_answer_index: 2
	},
	{
		id: '2107',
		section: 'AERODINAMICA',
		text: "L'efficienza aerodinamica è:",
		answers: [
			'il rapporto tra portanza e resistenza.',
			'il rapporto tra carico alare e velocità.',
			'il rapporto tra superficie alare e portanza.'
		],
		correct_answer_index: 0
	},
	{
		id: '2108',
		section: 'AERODINAMICA',
		text: "L'efficienza aerodinamica è:",
		answers: [
			'il rapporto tra la sua superficie ed il peso trasportato.',
			'il rapporto tra il peso trasportato e la sua velocità massima.',
			'il rapporto tra Cp e Cr.'
		],
		correct_answer_index: 2
	},
	{
		id: '2109',
		section: 'AERODINAMICA',
		text: "L'efficienza di un'ala si può esprimere come:",
		answers: [
			'il rapporto tra la velocità orizzontale e quella verticale.',
			'il rapporto tra la velocità verticale e quella orizzontale.',
			'il rapporto tra superficie e peso.'
		],
		correct_answer_index: 0
	},
	{
		id: '2110',
		section: 'AERODINAMICA',
		text: "Il rapporto tra portanza e resistenza generate da un'ala a un certo regime di volo, ne rappresenta l'efficienza e varia:",
		answers: [
			"al variare dell'angolo d'incidenza.",
			'al variare della superficie alare.',
			'al variare del carico alare.'
		],
		correct_answer_index: 0
	},
	{
		id: '2111',
		section: 'AERODINAMICA',
		text: "L'efficienza massima di un parapendio è uguale a 8. Che cosa significa?",
		answers: [
			'In aria calma può essere percorso 1 km perdendo 800 m di quota.',
			'Il rapporto tra apertura alare e corda alare è pari a 8.',
			'In aria calma possono essere percorsi 8 km perdendo 1000 m di quota.'
		],
		correct_answer_index: 2
	},
	{
		id: '2112',
		section: 'AERODINAMICA',
		text: "Al variare dell'incidenza varia l'efficienza di un'ala perché:",
		answers: [
			"varia solo il coefficiente di portanza Cp dell'ala.",
			"varia solo il coefficiente di resistenza Cr dell'ala.",
			'variano i coefficienti di portanza e resistenza Cp e Cr.'
		],
		correct_answer_index: 2
	},
	{
		id: '2113',
		section: 'AERODINAMICA',
		text: "L'efficienza massima varia al variare del peso del pilota?",
		answers: [
			"Si, anche se l'ala al variare del peso non si deforma.",
			"No, purché al variare del peso l'ala non si deformi e l'aria sia calma.",
			"No, anche se l'ala al variare del peso si deforma."
		],
		correct_answer_index: 1
	},
	{
		id: '2114',
		section: 'AERODINAMICA',
		text: "Volando in aria calma due piloti di peso diverso utilizzano lo stesso deltaplano o parapendio. Che risultati ottengono volando al medesimo regime di volo, se l'ala non si deforma al variare del carico?",
		answers: [
			'Percorrono la stessa distanza, ma in tempi diversi.',
			'Percorrono distanze diverse, ma impiegano uguali tempi.',
			"Percorrono distanze diverse ed in tempi diversi anche se l'ala non si deforma in funzione del peso."
		],
		correct_answer_index: 0
	},
	{
		id: '2115',
		section: 'AERODINAMICA',
		text: "Volando in aria calma il peso del pilota, se l'ala non si deforma al variare del carico, influenzerà:",
		answers: [
			'la sola efficienza aerodinamica.',
			"l'efficienza aerodinamica e la velocità all'aria, ma non il tasso di caduta.",
			"la velocità all'aria ed il tasso di caduta, ma non l'efficienza aerodinamica."
		],
		correct_answer_index: 2
	},
	{
		id: '2116',
		section: 'AERODINAMICA',
		text: "Un'ala in volo, iniziando una virata:",
		answers: [
			'aumenta il proprio tasso di caduta.',
			'mantiene inalterato il tasso di caduta.',
			'diminuisce il proprio tasso di caduta.'
		],
		correct_answer_index: 0
	},
	{
		id: '2117',
		section: 'AERODINAMICA',
		text: "Aumentando il carico alare a condizione che l'ala non si deformi e volando con una certa incidenza, si realizzeranno:",
		answers: [
			'velocità e tasso di caduta maggiori.',
			'velocità e tasso di caduta minori.',
			'velocità maggiore e tasso di caduta minore.'
		],
		correct_answer_index: 0
	},
	{
		id: '2118',
		section: 'AERODINAMICA',
		text: "E' possibile che un deltaplano o un parapendio volino stabilmente su una traiettoria orizzontale in condizioni di aria calma?",
		answers: [
			'Si, se il loro profilo è molto sofisticato.',
			'No, perché ciò significherebbe in sostanza che è stato azzerato il valore della resistenza aerodinamica.',
			'Si, avendo un basso carico alare.'
		],
		correct_answer_index: 1
	},
	{
		id: '2119',
		section: 'AERODINAMICA',
		text: 'Traiettorie orizzontali stabili sono realizzabili con deltaplano e parapendio:',
		answers: [
			'solo rispetto al terreno in condizioni di vento in coda sostenuto.',
			'solo rispetto al terreno in condizioni di ascendenza.',
			"anche rispetto all'aria in condizioni di ascendenza."
		],
		correct_answer_index: 1
	},
	{
		id: '2120',
		section: 'AERODINAMICA',
		text: "La polare di un'ala è una rappresentazione grafica che:",
		answers: [
			"indica i valori di velocità al suolo al variare dell'incidenza.",
			"indica i valori dei coefficienti di portanza e resistenza al variare dell'angolo di assetto.",
			"indica i valori dei coefficienti di portanza e resistenza al variare dell'angolo d'incidenza."
		],
		correct_answer_index: 2
	},
	{
		id: '2121',
		section: 'AERODINAMICA',
		text: "Che cosa è la polare delle velocità o odografa di un'ala?",
		answers: [
			"È un grafico sul quale sono riportati i valori delle velocità orizzontali e delle velocità verticali dell'ala al variare dell'angolo d'incidenza.",
			"È un grafico sul quale sono riportati i valori della portanza e della resistenza al variare dell'angolo d'incidenza.",
			"È un grafico sul quale sono riportati i valori della trazione e della resistenza al variare dell'angolo d'incidenza."
		],
		correct_answer_index: 0
	},
	{
		id: '2122',
		section: 'AERODINAMICA',
		text: "Se l'ala non si deforma, al variare del peso del pilota la polare delle velocità:",
		answers: [
			'si modifica e non si sposta rispetto agli assi cartesiani.',
			'non si modifica e non si sposta rispetto agli assi cartesiani.',
			'si sposta rispetto agli assi cartesiani.'
		],
		correct_answer_index: 2
	},
	{
		id: '2123',
		section: 'AERODINAMICA',
		text: "Quali valori si possono ricavare dalla polare delle velocità di un'ala?",
		answers: [
			"Quelli della portanza al variare dell'incidenza.",
			"Quelli della resistenza al variare dell'incidenza.",
			"Quelli delle velocità orizzontali e verticali ai vari angoli d'incidenza."
		],
		correct_answer_index: 2
	},
	{
		id: '2124',
		section: 'AERODINAMICA',
		text: "Sulla polare delle velocità di un'ala normalmente il minimo tasso di caduta si realizza volando:",
		answers: [
			"all'incidenza alla quale corrisponde il minimo valore della resistenza.",
			"all'incidenza alla quale corrisponde la massima efficienza in aria calma.",
			"ad un'incidenza maggiore di quella cui corrisponde la massima efficienza in aria calma."
		],
		correct_answer_index: 2
	},
	{
		id: '2125',
		section: 'AERODINAMICA',
		text: "Sulla polare delle velocità di un'ala normalmente la massima velocità orizzontale si realizza volando:",
		answers: [
			"al valore d'incidenza cui corrisponde una resistenza maggiore a quella che si ottiene alla massima efficienza aria.",
			"al valore d'incidenza cui corrisponde il miglior rapporto superficie proiettata / allungamento.",
			"al valore d'incidenza massimo."
		],
		correct_answer_index: 0
	},
	{
		id: '2126',
		section: 'AERODINAMICA',
		text: "Sulla polare delle velocità di un'ala normalmente la massima efficienza in aria calma si realizza volando:",
		answers: [
			"con l'angolo d'incidenza cui corrisponde il valore massimo del rapporto tra resistenza e portanza.",
			"con l'angolo d'incidenza cui corrisponde il valore massimo del rapporto tra portanza e resistenza.",
			"con l'angolo d'incidenza cui corrisponde il valore massimo del rapporto tra portanza e peso."
		],
		correct_answer_index: 1
	},
	{
		id: '2127',
		section: 'AERODINAMICA',
		text: "In condizioni di ascendenza l'efficienza massima al suolo aumenta rispetto a quella che si otterrebbe in aria calma. Adeguando la polare delle velocità di un'ala a queste condizioni si vede che i migliori risultati si realizzano comunque volando:",
		answers: [
			"a velocità all'aria maggiore di quelle utilizzate in condizioni di aria calma.",
			"a velocità all'aria minore di quelle utilizzate in condizioni di aria calma.",
			"alla medesima velocità all'aria che si utilizzerebbe in condizioni di aria calma."
		],
		correct_answer_index: 1
	},
	{
		id: '2128',
		section: 'AERODINAMICA',
		text: "In condizioni di discendenza l'efficienza massima al suolo diminuisce rispetto a quella che si otterrebbe in aria calma. Adeguando la polare delle velocità di un'ala a queste condizioni si vede che i migliori risultati comunque si realizzano volando:",
		answers: [
			"a velocità all'aria maggiori di quelle utilizzate in aria calma.",
			"a velocità all'aria minori di quelle utilizzate in aria calma.",
			"alla medesima velocità all'aria che si utilizzerebbe in condizioni di aria calma."
		],
		correct_answer_index: 0
	},
	{
		id: '2129',
		section: 'AERODINAMICA',
		text: 'Con vento a favore la massima efficienza al suolo è maggiore di quella ottenibile in aria calma. Sulla polare delle velocità si vede che i migliori risultati si realizzano comunque volando:',
		answers: [
			"ad incidenza maggiore di quella che si utilizzerebbe per ottenere la massima efficienza in aria calma (velocità all'aria minore).",
			"ad incidenza minore di quella che si utilizzerebbe per ottenere la massima efficienza in aria calma (velocità all'aria maggiore).",
			"all'incidenza che si utilizzerebbe per ottenere la massima efficienza in aria calma."
		],
		correct_answer_index: 0
	},
	{
		id: '2130',
		section: 'AERODINAMICA',
		text: 'Con vento contrario la massima efficienza al suolo è minore di quella ottenibile in aria calma. Sulla polare delle velocità si vede che i migliori risultati si realizzano comunque volando:',
		answers: [
			"all'incidenza che si utilizzerebbe per ottenere la massima efficienza in aria calma.",
			"ad incidenza maggiore di quella che si utilizzerebbe per ottenere la massima efficienza in aria calma (velocità all'aria minore).",
			"ad incidenza minore di quella che si utilizzerebbe per ottenere la massima efficienza in aria calma (velocità all'aria maggiore)."
		],
		correct_answer_index: 2
	},
	{
		id: '2131',
		section: 'AERODINAMICA',
		text: 'A parità di condizioni, di capacità e di ala a disposizione veleggia più a lungo il pilota:',
		answers: ['più leggero.', 'più pesante.', 'che fa virate più strette.'],
		correct_answer_index: 0
	},
	{
		id: '2132',
		section: 'AERODINAMICA',
		text: 'In condizioni di vento contrario, usando la stessa ala, il pilota più pesante:',
		answers: [
			"volerà con un'efficienza massima al suolo minore di quella realizzata dal pilota più leggero.",
			"volerà con un'efficienza al suolo identica a quella realizzata dal pilota più leggero.",
			"volerà con un'efficienza massima al suolo maggiore di quella realizzata dal pilota più leggero."
		],
		correct_answer_index: 2
	},
	{
		id: '2133',
		section: 'AERODINAMICA',
		text: 'In condizioni di vento a favore, usando la stessa ala, il pilota più pesante:',
		answers: [
			"volerà con un'efficienza massima al suolo minore di quella realizzata dal pilota più leggero.",
			"volerà con un'efficienza massima al suolo maggiore di quella realizzata dal pilota più leggero.",
			"volerà con un'efficienza massima al suolo identica a quella realizzata dal pilota più leggero."
		],
		correct_answer_index: 0
	},
	{
		id: '2134',
		section: 'AERODINAMICA',
		text: 'In condizioni aerologiche sfavorevoli, quali vento contrario e discendenza, volando con la medesima ala è:',
		answers: [
			'sfavorito il pilota più pesante.',
			'sfavorito il pilota più leggero.',
			'non ci sono differenze.'
		],
		correct_answer_index: 1
	},
	{
		id: '2135',
		section: 'AERODINAMICA',
		text: 'Che cosa è lo stallo?',
		answers: [
			"una condizione di volo in cui si verifica il distacco dei filetti fluidi dall'ala a causa dell'eccessivo angolo d'incidenza.",
			"È una condizione di volo in cui si verifica un calo netto della portanza a causa di una brusca diminuzione dell'angolo d'incidenza.",
			"È una condizione di volo in cui si verifica un brusco aumento della resistenza dovuto all'eccessiva velocità."
		],
		correct_answer_index: 0
	},
	{
		id: '2136',
		section: 'AERODINAMICA',
		text: "Lo stallo di un'ala si può verificare:",
		answers: [
			"solo a bassa velocità indipendentemente dall'angolo d'incidenza.",
			'solo a bassa velocità con incidenza oltre il valore critico.',
			'a qualsiasi velocità con incidenza oltre il valore critico.'
		],
		correct_answer_index: 2
	},
	{
		id: '2137',
		section: 'AERODINAMICA',
		text: 'In virata la velocità minima di volo e quella di stallo sono identiche a quelle del volo rettilineo?',
		answers: ['No, sono maggiori.', 'Si.', 'No, sono minori.'],
		correct_answer_index: 0
	},
	{
		id: '2138',
		section: 'AERODINAMICA',
		text: 'La velocità di stallo è influenzata dal carico alare?',
		answers: [
			'No.',
			"Si, aumenta con l'aumentare del carico alare.",
			"Si, diminuisce con l'aumentare del carico alare."
		],
		correct_answer_index: 1
	},
	{
		id: '2139',
		section: 'AERODINAMICA',
		text: "E' possibile con il deltaplano e il parapendio andare in stallo ad alta velocità?",
		answers: [
			'No.',
			'Solo in virata.',
			"Si, se si raggiunge e si supera il valore critico dell'angolo di incidenza."
		],
		correct_answer_index: 2
	},
	{
		id: '2140',
		section: 'AERODINAMICA',
		text: "Un'ala stalla normalmente a diversi angoli d'incidenza se varia la velocità?",
		answers: [
			'Si, infatti lo stallo dipende solo dalla velocità.',
			"No, lo stallo non dipende dalla velocità ma solo dall'angolo d'incidenza.",
			"No, lo stallo non dipende dalla velocità né dall'angolo d'incidenza."
		],
		correct_answer_index: 1
	},
	{
		id: '3011',
		section: 'PRONTO SOCCORSO',
		text: "Come si deve intervenire in presenza di un infortunato che presenta sospetto trauma cranico con fuoriuscita di sangue dall'orecchio, in attesa di idonei mezzi di soccorso?",
		answers: [
			'Tamponare la perdita di sangue.',
			'Tenere il soggetto adagiato sul fianco dalla parte da cui perde sangue.',
			'Porre il soggetto in posizione seduta.'
		],
		correct_answer_index: 1
	},
	{
		id: '3012',
		section: 'PRONTO SOCCORSO',
		text: "Come s'interviene nel caso che una persona presenti un trauma all'addome?",
		answers: [
			'Si provvede a chiamare idonei mezzi di soccorso, mettendola in piedi per alleviarle il dolore.',
			"Si provvede a chiamare idonei mezzi di soccorso, evitando di muoverla e di comprimerle l'addome.",
			"Si provvede a chiamare idonei mezzi di soccorso, nel frattempo le si praticano massaggi all'addome."
		],
		correct_answer_index: 1
	},
	{
		id: '3013',
		section: 'PRONTO SOCCORSO',
		text: 'Nel caso una persona sia colpita da scarica elettrica e che rimanga a contatto con il cavo di alta tensione, il soccorritore dovrà:',
		answers: [
			'avvicinarsi al più presto e prestarle soccorso.',
			"rimanere a distanza di sicurezza dando immediatamente l'allarme.",
			'distaccarla immediatamente dalla sorgente elettrica servendosi ad esempio di un bastone di legno, che è uno strumento isolante.'
		],
		correct_answer_index: 1
	},
	{
		id: '3014',
		section: 'PRONTO SOCCORSO',
		text: 'Nel caso che una persona sia colpita da scarica elettrica e che rimanga a contatto con il cavo a bassa tensione, il soccorritore dovrà:',
		answers: [
			'rimanere a distanza di sicurezza.',
			'prenderla per un braccio e tentare di staccarla dalla sorgente elettrica.',
			'staccarla dalla sorgente elettrica facendo uso di un attrezzo di materiale isolante come ad esempio il legno.'
		],
		correct_answer_index: 2
	},
	{
		id: '3015',
		section: 'PRONTO SOCCORSO',
		text: 'Come intervenire in soccorso di un soggetto che presenti una distorsione al piede?',
		answers: [
			'Farlo camminare subito per ripristinargli la circolazione.',
			'Immobilizzare la parte lesa con ovatta ed eventuale fascia elastica.',
			"Trazionare l'arto infortunato cercando di ricomporre la distorsione."
		],
		correct_answer_index: 1
	},
	{
		id: '3016',
		section: 'PRONTO SOCCORSO',
		text: 'Come si riconosce una spalla lussata?',
		answers: [
			"Da un abbassamento dell'arto con infossamento all'altezza dell'articolazione.",
			"Da un improvviso gonfiore in corrispondenza dell'articolazione.",
			'Dal fatto che braccio e avambraccio risultano privi di articolazione.'
		],
		correct_answer_index: 0
	},
	{
		id: '3017',
		section: 'PRONTO SOCCORSO',
		text: "Come s'interviene provvisoriamente in caso di grave scottatura?",
		answers: [
			'Si mantiene pulita e detersa la parte ustionata sino al momento in cui sono possibili interventi specialistici qualificati.',
			"Non si tocca assolutamente la parte ustionata anche se è sporca trasportando l'infortunato dal medico più vicino.",
			'Si pone sulla parte ustionata un qualsiasi unguento disponibile.'
		],
		correct_answer_index: 0
	},
	{
		id: '3018',
		section: 'PRONTO SOCCORSO',
		text: "Come s'interviene per soccorrere persone che abbiano perso conoscenza?",
		answers: [
			'Si lasciano o si adagiano semplicemente in posizione prona.',
			'Si dispongono su un fianco sollevando un braccio e una gamba per evitare che il vomito ostruisca le vie respiratorie.',
			'Si bagna loro la fronte con acqua fredda.'
		],
		correct_answer_index: 1
	},
	{
		id: '3019',
		section: 'PRONTO SOCCORSO',
		text: "Come s'interviene su una persona svenuta a seguito di trauma?",
		answers: [
			'Si prova a rianimarla energicamente scuotendola dopo aver chiamato idonei mezzi di soccorso.',
			'Si tiene sotto monitoraggio il battito cardiaco e la frequenza respiratoria, chiamando con urgenza idonei mezzi di soccorso.',
			'Si adagia in posizione supina, le si pratica la respirazione, si chiamano se necessario idonei mezzi di soccorso.'
		],
		correct_answer_index: 1
	},
	{
		id: '3020',
		section: 'PRONTO SOCCORSO',
		text: 'Qual è il rimedio migliore in caso di principio di assideramento di una parte del corpo?',
		answers: [
			'Fare ingerire al paziente bevande alcoliche.',
			'Fare muovere la parte colpita in modo da provocare circolazione sanguigna.',
			'Tenere la parte colpita al caldo coprendola e facendo ingerire al paziente bevande calde.'
		],
		correct_answer_index: 2
	},
	{
		id: '4001',
		section: 'FISIOPATOLOGIA DEL VOLO',
		text: "Come varia la pressione parziale dell'ossigeno a livello polmonare, al variare dell'altitudine?",
		answers: [
			"Diminuisce all'aumentare dell'altitudine.",
			"Diminuisce all'aumentare dell'altitudine, ma non scende mai sotto valori di guardia.",
			"Aumenta all'aumentare dell'altitudine."
		],
		correct_answer_index: 0
	},
	{
		id: '4002',
		section: 'FISIOPATOLOGIA DEL VOLO',
		text: "Ad elevate altitudini nell'organismo umano si instaura una situazione alterata, prodotta dalla ridotta pressione di ossigeno. Essa prende il nome di:",
		answers: ['ipotermia.', 'ipossia.', 'ipotensione.'],
		correct_answer_index: 1
	},
	{
		id: '4003',
		section: 'FISIOPATOLOGIA DEL VOLO',
		text: "Che cosa è l'ipossia?",
		answers: [
			"È lo stato in cui l'organismo viene a trovarsi a causa dell'insufficiente pressione sanguigna dovuta alla quota.",
			"È lo stato in cui l'organismo viene a trovarsi a causa dell'insufficiente temperatura corporea dovuta alla quota.",
			"È lo stato in cui l'organismo viene a trovarsi a causa dell'insufficiente pressione dell'ossigeno a livello degli alveoli polmonari dovuta alla quota."
		],
		correct_answer_index: 2
	},
	{
		id: '4004',
		section: 'FISIOPATOLOGIA DEL VOLO',
		text: "Quali sono gli effetti dell'ipossia?",
		answers: [
			"Diminuzione dell'efficienza mentale, nausea, euforia, aumento del ritmo di ventilazione polmonare.",
			'Vasodilatazione periferica, secchezza delle fauci, rigidità muscolare, diminuzione del ritmo di ventilazione polmonare.',
			'Diminuzione della pressione arteriosa, ischemia periferica, paralisi dei centri respiratori.'
		],
		correct_answer_index: 0
	},
	{
		id: '4005',
		section: 'FISIOPATOLOGIA DEL VOLO',
		text: 'La decompressione da alta quota può dar luogo a liberazione di bolle gassose nel sangue, detti emboli. Qual è la condizione in cui questo pericoloso fenomeno può verificarsi con maggiore facilità?',
		answers: [
			'Lenta ascensione oltre i 7000 metri.',
			'Rapida ascensione a 7000 metri ed oltre.',
			'Permanenza ad alta quota dopo lungo periodo di ambientamento.'
		],
		correct_answer_index: 1
	},
	{
		id: '4006',
		section: 'FISIOPATOLOGIA DEL VOLO',
		text: 'Durante il volo il corpo umano è sottoposto a vari tipi di accelerazione. Quali sono meglio sopportate tra quelle positive (testa-piedi) e quelle negative (piedi-testa)?',
		answers: ['Entrambe in uguale misura.', 'Quelle negative.', 'Quelle positive.'],
		correct_answer_index: 2
	},
	{
		id: '4007',
		section: 'FISIOPATOLOGIA DEL VOLO',
		text: 'Le accelerazioni positive (testa-piedi) corrispondono a un aumento dei "G" o meglio a un aumento fittizio dell\'accelerazione di gravità. Quando si possono manifestare in volo?',
		answers: [
			'Durante virate corrette.',
			'Durante il volo su traiettoria rettilinea con forte pendenza.',
			'Durante brusche manovre di picchiata.'
		],
		correct_answer_index: 0
	},
	{
		id: '4008',
		section: 'FISIOPATOLOGIA DEL VOLO',
		text: 'Le accelerazioni negative (piedi-testa) corrispondono a una diminuzione dei "G" o meglio a una diminuzione fittizia della accelerazione di gravità. Quando si possono manifestare in volo?',
		answers: [
			'Durante una brusca richiamata.',
			'Durante brusche manovre di picchiata.',
			'Durante il volo su traiettoria rettilinea con forte pendenza.'
		],
		correct_answer_index: 1
	},
	{
		id: '4009',
		section: 'FISIOPATOLOGIA DEL VOLO',
		text: 'Quando sussiste in volo il rischio che il pilota soffra di un oscuramento della vista a seguito di manovre che inducono forti accelerazioni?',
		answers: [
			'Quando le accelerazioni indotte sono del tipo positivo (testa-piedi) e superano i 4 "G" per un tempo superiore a 4 secondi.',
			'Quando comunque sono del tipo negativo (piedi-testa).',
			'Quando si passa da accelerazioni positive ad accelerazioni negative senza soluzione di continuità in meno di 4 secondi.'
		],
		correct_answer_index: 0
	},
	{
		id: '4010',
		section: 'FISIOPATOLOGIA DEL VOLO',
		text: "Considerate le caratteristiche fisiologiche dell'uomo, è possibile eseguire correttamente un volo in nube, facendo affidamento sul solo senso dell'equilibrio?",
		answers: ['No.', 'Si.', "Si, se l'equilibrio è affinato da adeguato addestramento."],
		correct_answer_index: 0
	},
	{
		id: '5001',
		section: 'METEOROLOGIA E AEROLOGIA',
		text: "Che cosa è l'atmosfera?",
		answers: [
			'È la massa gassosa che sovrasta la superficie terrestre e la cui altezza è praticamente illimitata.',
			'È la massa gassosa che sovrasta la superficie terrestre e la cui altezza è 12 km.',
			'È la massa gassosa di altezza ben definita che sovrasta la superficie terrestre la cui parte inferiore si definisce troposfera.'
		],
		correct_answer_index: 2
	},
	{
		id: '5002',
		section: 'METEOROLOGIA E AEROLOGIA',
		text: 'Come può essere definita la troposfera?',
		answers: [
			"È la porzione inferiore dell'atmosfera compresa tra la superficie terrestre e la quota alla quale la pressione atmosferica è praticamente nulla.",
			"È la porzione inferiore dell'atmosfera compresa tra la superficie terrestre e la quota alla quale l'umidità dell'aria è uguale a zero.",
			"È la porzione inferiore dell'atmosfera compresa tra la superficie terrestre e lo strato, detto tropopausa, all'interno del quale il gradiente termico verticale dell'aria è praticamente nullo."
		],
		correct_answer_index: 2
	},
	{
		id: '5003',
		section: 'METEOROLOGIA E AEROLOGIA',
		text: 'I fenomeni meteorologici (meteore) si verificano normalmente:',
		answers: [
			"all'interno della porzione di atmosfera terrestre detta troposfera.",
			"all'interno dell'intera atmosfera e sino al suo limite superiore.",
			'solo negli strati bassi della troposfera.'
		],
		correct_answer_index: 0
	},
	{
		id: '5004',
		section: 'METEOROLOGIA E AEROLOGIA',
		text: 'La quota della tropopausa, intesa come limite superiore della troposfera:',
		answers: [
			'è ben determinata, non è variabile e il suo valore è di 12 km.',
			"è variabile in funzione delle stagioni e della latitudine, il suo valore oscilla mediamente tra 8 km in corrispondenza dei poli e 16 km in corrispondenza dell'equatore.",
			"è variabile solo in funzione della latitudine, il suo valore è 8 km ai poli e 16 km all'equatore."
		],
		correct_answer_index: 1
	},
	{
		id: '5005',
		section: 'METEOROLOGIA E AEROLOGIA',
		text: "L'aria è una miscela di gas formata prevalentemente da:",
		answers: [
			'ossigeno e gas rari.',
			'azoto, ossigeno, vapore acqueo e gas rari.',
			'azoto, ossigeno e vapore acqueo condensato.'
		],
		correct_answer_index: 1
	},
	{
		id: '5006',
		section: 'METEOROLOGIA E AEROLOGIA',
		text: "Quali sono le caratteristiche fisiche dell'aria la cui combinazione o variazione dà luogo normalmente ai fenomeni meteorologici?",
		answers: [
			'Pressione, temperatura e densità.',
			'Pressione, velocità del vento e densità.',
			'Pressione, temperatura e umidità.'
		],
		correct_answer_index: 2
	},
	{
		id: '5007',
		section: 'METEOROLOGIA E AEROLOGIA',
		text: "Il vapore acqueo è un gas invisibile contenuto nell'aria in percentuali variabili?",
		answers: [
			'Si.',
			'No, è un gas visibile.',
			'No, non è un gas ma acqua liquida in minuscole gocce quindi pur sempre visibile.'
		],
		correct_answer_index: 0
	},
	{
		id: '5008',
		section: 'METEOROLOGIA E AEROLOGIA',
		text: 'In natura esiste normalmente aria totalmente priva di vapore acqueo, cioè assolutamente secca?',
		answers: ['No.', 'Si.', 'Si, in corrispondenza di regioni desertiche.'],
		correct_answer_index: 0
	},
	{
		id: '5009',
		section: 'METEOROLOGIA E AEROLOGIA',
		text: "Per umidità assoluta s'intende:",
		answers: [
			"la quantità in grammi di vapore acqueo contenuta in un metro cubo d'aria.",
			"la quantità in volume di vapore acqueo contenuta in un metro cubo d'aria.",
			"la quantità in grammi di vapore acqueo necessaria a saturare un metro cubo d'aria."
		],
		correct_answer_index: 0
	},
	{
		id: '5010',
		section: 'METEOROLOGIA E AEROLOGIA',
		text: "Per umidità specifica s'intende:",
		answers: [
			"la quantità in grammi di vapore acqueo contenuta in un metro cubo d'aria.",
			"la quantità in volume di vapore acqueo contenuta in un metro cubo d'aria.",
			"la quantità in grammi di vapore acqueo contenuta in un chilogrammo d'aria."
		],
		correct_answer_index: 2
	},
	{
		id: '5011',
		section: 'METEOROLOGIA E AEROLOGIA',
		text: "Per umidità relativa, che è sempre espressa in percentuale, s'intende:",
		answers: [
			"la quantità in volume di vapore acqueo contenuta in un metro cubo d'aria.",
			"la quantità in volume di vapore acqueo contenuta in un chilogrammo d'aria.",
			"il rapporto esistente tra il contenuto attuale di vapore acqueo dell'aria ed il contenuto di vapore acqueo necessario alla saturazione (massimo contenuto di vapore acqueo possibile ai valori attuali di pressione e temperatura dell'aria)."
		],
		correct_answer_index: 2
	},
	{
		id: '5012',
		section: 'METEOROLOGIA E AEROLOGIA',
		text: "Come varia l'umidità relativa dell'aria abbassandone la sola temperatura?",
		answers: [
			"L'umidità relativa aumenta sino a raggiungere anche il valore del 100%.",
			"L'umidità relativa diminuisce.",
			"L'umidità relativa non varia al variare della temperatura se la pressione rimane costante."
		],
		correct_answer_index: 0
	},
	{
		id: '5013',
		section: 'METEOROLOGIA E AEROLOGIA',
		text: "Come varia l'umidità relativa dell'aria all'aumentare della sola pressione atmosferica?",
		answers: [
			"L'umidità relativa diminuisce.",
			"L'umidità relativa aumenta anche sino a raggiungere il valore del 100%.",
			"L'umidità relativa non varia al variare della pressione se la temperatura rimane costante."
		],
		correct_answer_index: 1
	},
	{
		id: '5014',
		section: 'METEOROLOGIA E AEROLOGIA',
		text: 'Che cosa è la temperatura di rugiada?',
		answers: [
			"La temperatura alla quale l'aria diverrebbe satura se raffreddata senza subire variazioni di pressione.",
			"La temperatura alla quale l'aria diverrebbe satura se riscaldata senza subire variazioni di pressione.",
			'La temperatura alla quale si otterrebbe la saturazione aumentando la pressione di un millibar o hectopascal.'
		],
		correct_answer_index: 0
	},
	{
		id: '5015',
		section: 'METEOROLOGIA E AEROLOGIA',
		text: "Che cosa avviene quando per qualche motivo l'umidità relativa dell'aria raggiunge il valore del 100%?",
		answers: [
			"L'aria in questione diviene satura e in essa può aver luogo il processo di condensazione del vapore acqueo.",
			"L'aria in questione diviene satura e non può quindi aver luogo il processo di condensazione del vapore acqueo.",
			"L'aria in questione diviene satura e in essa può aver luogo il processo di condensazione del vapore acqueo solo qualora aumenti contemporaneamente la temperatura."
		],
		correct_answer_index: 0
	},
	{
		id: '5016',
		section: 'METEOROLOGIA E AEROLOGIA',
		text: "Perché all'interno di una massa d'aria avvenga il processo di condensazione del vapore acqueo è necessario:",
		answers: [
			'abbassarne temperatura e pressione contemporaneamente.',
			'abbassarne la temperatura qualora la pressione rimanga costante.',
			'abbassarne la pressione qualora la temperatura rimanga costante.'
		],
		correct_answer_index: 1
	},
	{
		id: '5017',
		section: 'METEOROLOGIA E AEROLOGIA',
		text: "Il processo di condensazione del vapore acqueo nell'aria atmosferica determina il passaggio di stato dell'acqua da gas a liquido. E' possibile affermare che tale processo sprigiona energia termica (calore latente di condensazione) che è trasmessa all'aria stessa, la cui temperatura varia conseguentemente?",
		answers: [
			'Si.',
			"No, perché i passaggi di stato dell'acqua dallo stato gassoso allo stato liquido e viceversa non sprigionano energia termica.",
			"No, perché comunque l'energia termica sprigionata non altera la temperatura dell'aria."
		],
		correct_answer_index: 0
	},
	{
		id: '5018',
		section: 'METEOROLOGIA E AEROLOGIA',
		text: "L'evaporazione dell'acqua è un processo endotermico?",
		answers: [
			'No, non è un processo endotermico.',
			"Si, infatti la temperatura dell'acqua liquida si abbassa durante l'evaporazione, a meno che non sia fornito calore dall'ambiente circostante.",
			"Si, infatti la temperatura dell'acqua liquida s'innalza perché l'evaporazione è un processo che libera calore."
		],
		correct_answer_index: 1
	},
	{
		id: '5019',
		section: 'METEOROLOGIA E AEROLOGIA',
		text: "Quando all'interno di una massa d'aria si verifica il processo di condensazione del vapore acqueo la temperatura dell'aria stessa tende:",
		answers: [
			'a diminuire.',
			'a rimanere costante se non intervengono altri fattori.',
			'ad aumentare se non intervengono altri fattori.'
		],
		correct_answer_index: 2
	},
	{
		id: '5020',
		section: 'METEOROLOGIA E AEROLOGIA',
		text: "Generalmente si può affermare che i processi di condensazione e di evaporazione dell'acqua:",
		answers: [
			"rispettivamente forniscono e sottraggono calore alla massa d'aria interessata.",
			"non forniscono né sottraggono calore alla massa d'aria interessata.",
			"sono solo in grado di fornire calore alla massa d'aria interessata."
		],
		correct_answer_index: 0
	},
	{
		id: '5021',
		section: 'METEOROLOGIA E AEROLOGIA',
		text: "È vero che i fenomeni meteorologici sono anche causati dai processi di trasformazione dell'acqua da liquido a vapore o a solido e viceversa per via delle conseguenti cessioni o sottrazioni di energia termica alle masse d'aria?",
		answers: [
			'No, essi non hanno nulla a che vedere con quanto sopra.',
			'No, essi sono esclusivamente determinati dai processi di condensazione del vapore acqueo.',
			'Si.'
		],
		correct_answer_index: 2
	},
	{
		id: '5022',
		section: 'METEOROLOGIA E AEROLOGIA',
		text: 'Le nubi, così come il fumo di una pentola in cui vi è acqua in ebollizione, sono costituite da vapore acqueo?',
		answers: [
			'No, ma da aerosol o piccolissime gocce di acqua allo stato liquido.',
			'Si, perché costituite da aerosol che sono molecole gassose molto grandi.',
			'Si, perché in determinate condizioni anche il vapore acqueo è un gas visibile.'
		],
		correct_answer_index: 0
	},
	{
		id: '5023',
		section: 'METEOROLOGIA E AEROLOGIA',
		text: 'La pressione atmosferica si definisce come:',
		answers: [
			"il peso di una colonna d'aria pari a quello di una colonna di mercurio alta 1013.2 millimetri.",
			"il peso di una colonna d'aria di altezza unitaria.",
			"il peso della colonna d'aria che insiste sull'unità di superficie."
		],
		correct_answer_index: 2
	},
	{
		id: '5024',
		section: 'METEOROLOGIA E AEROLOGIA',
		text: 'Lo strumento per misurare la pressione atmosferica è:',
		answers: ["l'anemometro.", 'il pressostato.', 'il barometro.'],
		correct_answer_index: 2
	},
	{
		id: '5025',
		section: 'METEOROLOGIA E AEROLOGIA',
		text: "Salendo in quota il valore della pressione atmosferica diminuisce, infatti diminuisce il peso della colonna d'aria che insiste sull'unità di superficie. Tale diminuzione prende il nome di:",
		answers: [
			'gradiente barico orizzontale.',
			'gradiente barico verticale.',
			'gradiente termico verticale.'
		],
		correct_answer_index: 1
	},
	{
		id: '5026',
		section: 'METEOROLOGIA E AEROLOGIA',
		text: 'Il valore approssimativo della pressione atmosferica a circa 5500 m di altitudine sul livello del mare è:',
		answers: [
			'circa zero.',
			'un quarto di quello a livello del mare.',
			'la metà di quello a livello del mare (circa 500 millibar o hectopascal).'
		],
		correct_answer_index: 2
	},
	{
		id: '5027',
		section: 'METEOROLOGIA E AEROLOGIA',
		text: "In atmosfera standard, quasi mai esistente in natura perché ideata dall'uomo come elemento di riferimento, la pressione al livello del mare è:",
		answers: [
			'1013.2 millibar o hectopascal.',
			'760 millibar.',
			'variabile secondo la latitudine.'
		],
		correct_answer_index: 0
	},
	{
		id: '5028',
		section: 'METEOROLOGIA E AEROLOGIA',
		text: 'Se la pressione atmosferica in due punti della superficie terrestre dotati della medesima elevazione sul livello del mare è diversa si dice:',
		answers: [
			'che esiste un gradiente barico verticale.',
			"che l'atmosfera quel giorno non è standard.",
			'che esiste un gradiente barico orizzontale.'
		],
		correct_answer_index: 2
	},
	{
		id: '5029',
		section: 'METEOROLOGIA E AEROLOGIA',
		text: 'Che cosa sono le isobare?',
		answers: [
			'Le linee che uniscono i punti di uguale altitudine.',
			'Le linee che uniscono i punti nei quali la pressione atmosferica è standard.',
			'Le linee che uniscono i punti nei quali esiste uguale pressione atmosferica.'
		],
		correct_answer_index: 2
	},
	{
		id: '5030',
		section: 'METEOROLOGIA E AEROLOGIA',
		text: 'Il vento cosiddetto di gradiente è normalmente:',
		answers: [
			"uno spostamento di aria nell'atmosfera da una zona a pressione maggiore ad una zona a pressione minore.",
			"uno spostamento di aria nell'atmosfera da una zona a pressione minore ad una zona a pressione maggiore.",
			"uno spostamento di aria nell'atmosfera dovuto esclusivamente alla presenza di zone della terra con temperature differenti."
		],
		correct_answer_index: 0
	},
	{
		id: '5031',
		section: 'METEOROLOGIA E AEROLOGIA',
		text: 'Perché la direzione del vento non è mai rettilinea da una zona di alta pressione a una zona di bassa pressione?',
		answers: [
			'Solo perché la superficie terrestre è piena di ostacoli che il vento è costretto ad aggirare.',
			'Solo perché attorno ad una zona di alta pressione esistono più zone di bassa pressione.',
			'Soprattutto perché esistono forze devianti, quali quella di Coriolis e quella di attrito col terreno, che non consentono al vento di procedere in direzione rettilinea.'
		],
		correct_answer_index: 2
	},
	{
		id: '5032',
		section: 'METEOROLOGIA E AEROLOGIA',
		text: 'Tutti i corpi, i liquidi e i gas in movimento rispetto alla superficie terrestre, dotati di una componente di moto parallela ai meridiani, vengono deviati dalla loro traiettoria inizialmente rettilinea. Come si chiama la forza deviante che determina ciò e a che cosa è dovuta?',
		answers: [
			'Forza di Coriolis, dovuta alla rotazione della Terra attorno al proprio asse.',
			'Forza di Coriolis, dovuta alla rivoluzione della Terra attorno al Sole.',
			'Forza deviante, dovuta esclusivamente alla presenza degli attriti generati da ogni tipo di moto.'
		],
		correct_answer_index: 0
	},
	{
		id: '5033',
		section: 'METEOROLOGIA E AEROLOGIA',
		text: "Nell'emisfero Nord la forza di Coriolis determina una deviazione del vento, nel suo dirigersi da una zona di alta pressione a una zona di bassa pressione, verso:",
		answers: ['sinistra.', 'destra.', 'altre zone adiacenti di alta pressione.'],
		correct_answer_index: 1
	},
	{
		id: '5034',
		section: 'METEOROLOGIA E AEROLOGIA',
		text: "A seguito dell'intervento delle forze devianti, il vento nell'emisfero Nord circola attorno ad una zona od area di alta pressione in senso:",
		answers: [
			"antiorario se osservato dall'alto (es. da un satellite).",
			"orario se osservato dall'alto (es. da un satellite).",
			'orario se osservato dal basso.'
		],
		correct_answer_index: 1
	},
	{
		id: '5035',
		section: 'METEOROLOGIA E AEROLOGIA',
		text: "A seguito dell'intervento delle forze devianti, il vento nell'emisfero Nord circola attorno ad una zona od area di bassa pressione in senso:",
		answers: [
			'antiorario se osservato dal basso.',
			"orario se osservato dall'alto (es. da un satellite).",
			"antiorario se osservato dall'alto (es. da un satellite)."
		],
		correct_answer_index: 2
	},
	{
		id: '5036',
		section: 'METEOROLOGIA E AEROLOGIA',
		text: 'Come sono chiamate le zone o aree di bassa e di alta pressione?',
		answers: [
			'Aree cicloniche e anticicloniche e indicate rispettivamente con una H/A (high pressure/alta pressione) e una L/B (low pressure/bassa pressione) sulle carte meteorologiche.',
			'Aree cicloniche e anticicloniche e indicate rispettivamente con una L/B (low pressure/bassa pressione) e una H/A (high pressure/alta pressione) sulle carte meteorologiche.',
			'Aree anticicloniche e cicloniche e indicate rispettivamente con L/B (low pressure/bassa pressione) e una H/A (high pressure/alta pressione) sulle carte meteorologiche.'
		],
		correct_answer_index: 1
	},
	{
		id: '5037',
		section: 'METEOROLOGIA E AEROLOGIA',
		text: 'Se su una carta meteorologica si osservano isobare molto ravvicinate, si può affermare che:',
		answers: [
			'esiste un gradiente barico orizzontale minimo e il vento sarà sostenuto.',
			'esiste un gradiente barico orizzontale elevato e il vento sarà sostenuto.',
			'esiste un gradiente barico verticale elevato e il vento sarà sostenuto.'
		],
		correct_answer_index: 1
	},
	{
		id: '5038',
		section: 'METEOROLOGIA E AEROLOGIA',
		text: "L'osservazione delle isobare sulla carta del tempo ci consente di:",
		answers: [
			"individuare la direzione e l'intensità del vento in una certa zona oltre ad altri dati meteorologici utili alla previsione del tempo.",
			'individuare elementi e dati utili solamente alla previsione del tempo inteso come copertura nuvolosa del cielo.',
			"individuare solamente il gradiente barico verticale per un confronto con i parametri dell'atmosfera standard."
		],
		correct_answer_index: 0
	},
	{
		id: '5039',
		section: 'METEOROLOGIA E AEROLOGIA',
		text: 'Nella pratica del Volo Libero che cosa s\'intende comunemente per "vento meteorologico"?',
		answers: [
			'Il vento generato da fenomeni meteorologici rilevanti quali temporali, forti precipitazioni ecc.',
			'Il vento generato da fenomeni microclimatici locali come le brezze di valle o di monte.',
			"Il vento di gradiente, prodotto dalla situazione barica attuale rilevabile dalle carte del tempo mediante l'osservazione delle isobare."
		],
		correct_answer_index: 2
	},
	{
		id: '5040',
		section: 'METEOROLOGIA E AEROLOGIA',
		text: 'A quale valore in gradi corrisponde la direzione di provenienza di un vento da Sud?',
		answers: ['135°', '270°', '180°'],
		correct_answer_index: 2
	},
	{
		id: '5041',
		section: 'METEOROLOGIA E AEROLOGIA',
		text: 'Un vento proveniente da Nord-Est ha la seguente provenienza in gradi:',
		answers: ['45°', '225°', '135°'],
		correct_answer_index: 0
	},
	{
		id: '5042',
		section: 'METEOROLOGIA E AEROLOGIA',
		text: 'Emisfero Nord. Una Bassa Pressione si trova centrata a Nord di un preciso punto della superficie terrestre. Il vento predominante (meteorologico) che ci si attende di avere in quel punto proverrà ragionevolmente da:',
		answers: ['Nord.', 'Ovest.', 'Est.'],
		correct_answer_index: 1
	},
	{
		id: '5043',
		section: 'METEOROLOGIA E AEROLOGIA',
		text: 'Emisfero Nord. Una Bassa Pressione si trova centrata a Est di un preciso punto della superficie terrestre. Il vento predominante (meteorologico) che ci si attende di avere in quel punto proverrà ragionevolmente da:',
		answers: ['Nord.', 'Sud.', 'Ovest.'],
		correct_answer_index: 0
	},
	{
		id: '5044',
		section: 'METEOROLOGIA E AEROLOGIA',
		text: "Emisfero Nord. Un'area di Alta Pressione si trova centrata a Nord di un preciso punto della superficie terrestre. Il vento predominante (meteorologico) che ci si attende di avere in quel punto proverrà ragionevolmente da:",
		answers: ['Ovest.', 'Est.', 'Nord.'],
		correct_answer_index: 1
	},
	{
		id: '5045',
		section: 'METEOROLOGIA E AEROLOGIA',
		text: "Emisfero Nord. Un'area di Alta Pressione si trova centrata a Ovest di un preciso punto della superficie terrestre. Il vento predominante (meteorologico) che ci si attende di avere in quel punto proverrà ragionevolmente da:",
		answers: ['Sud.', 'Est.', 'Nord.'],
		correct_answer_index: 2
	},
	{
		id: '5046',
		section: 'METEOROLOGIA E AEROLOGIA',
		text: "Il Sole è la fonte principale di calore capace di elevare la temperatura dell'aria. Nella troposfera l'energia termica è trasmessa dal Sole direttamente all'aria stessa?",
		answers: [
			'Si, in gran parte per irraggiamento.',
			'Si, totalmente per conduzione.',
			'No, in gran parte è trasmessa indirettamente.'
		],
		correct_answer_index: 2
	},
	{
		id: '5047',
		section: 'METEOROLOGIA E AEROLOGIA',
		text: 'Il processo di trasmissione di energia termica secondo il quale il Sole riscalda la troposfera è:',
		answers: [
			"irraggiamento del suolo, conduzione di calore dal suolo all'aria sovrastante, circolazione convettiva di aria calda verso l'alto.",
			"irraggiamento degli strati bassi dell'atmosfera per riflessione del suolo, circolazione convettiva di aria calda verso l'alto.",
			"conduzione diretta di calore dal sole agli strati bassi dell'atmosfera con successiva circolazione convettiva di aria calda verso l'alto."
		],
		correct_answer_index: 0
	},
	{
		id: '5048',
		section: 'METEOROLOGIA E AEROLOGIA',
		text: "Durante una salita effettuata nella troposfera la temperatura dell'aria varia nel modo seguente:",
		answers: ['mediamente aumenta.', 'rimane mediamente costante.', 'mediamente diminuisce.'],
		correct_answer_index: 2
	},
	{
		id: '5049',
		section: 'METEOROLOGIA E AEROLOGIA',
		text: "La variazione della temperatura dell'aria al variare della quota si chiama:",
		answers: [
			'gradiente termico orizzontale.',
			'gradiente termico verticale.',
			'gradiente barico verticale.'
		],
		correct_answer_index: 1
	},
	{
		id: '5050',
		section: 'METEOROLOGIA E AEROLOGIA',
		text: "Qual è il gradiente termico verticale dell'atmosfera standard, ideata dall'uomo come elemento di riferimento, ma i cui parametri sono difficilmente reperibili in natura?",
		answers: [
			'1°C ogni 100 m di quota.',
			'0.65°C ogni 100 m di quota.',
			'6.5°C ogni 100 m di quota.'
		],
		correct_answer_index: 1
	},
	{
		id: '5051',
		section: 'METEOROLOGIA E AEROLOGIA',
		text: "Se, salendo in quota, si rileva la temperatura dell'aria ogni 100 m e si riportano i suoi valori su un grafico, si costruisce:",
		answers: [
			"la curva o diagramma di stato dell'atmosfera di quella località a quell'ora.",
			"l'adiabatica secca dell'atmosfera di quella località a quell'ora.",
			"l'isoterma di quella località a quell'ora."
		],
		correct_answer_index: 0
	},
	{
		id: '5052',
		section: 'METEOROLOGIA E AEROLOGIA',
		text: "Il gradiente termico verticale dell'atmosfera in una determinata località a una certa ora si ricava:",
		answers: [
			"dalla curva di stato dell'atmosfera relativa a quella località ed a quell'ora della giornata.",
			"dalla carta del tempo relativa a quella località ed a quell'ora della giornata.",
			"dal confronto tra adiabatica secca e adiabatica satura relative a quella località ed a quell'ora della giornata."
		],
		correct_answer_index: 0
	},
	{
		id: '5053',
		section: 'METEOROLOGIA E AEROLOGIA',
		text: "Una massa d' aria si solleva espandendosi con conseguente diminuzione della temperatura. Come si definisce il fenomeno e perchè?",
		answers: [
			"Sollevamento convettivo, perché avviene con scambio di calore con l'aria sovrastante.",
			"Sollevamento dinamico, perché avviene con una variazione molecolare dell'aria che si solleva.",
			"Sollevamento adiabatico, perché avviene in pratica senza scambio di calore con l'aria circostante."
		],
		correct_answer_index: 2
	},
	{
		id: '5054',
		section: 'METEOROLOGIA E AEROLOGIA',
		text: "In pratica l'aria che si solleva adiabaticamente, senza condensazione del vapore acqueo, perde:",
		answers: [
			'6.5°C di temperatura ogni 1000 m.',
			'1°C di temperatura ogni 100 m.',
			'valori di temperatura in funzione del gradiente termico verticale di quel giorno.'
		],
		correct_answer_index: 1
	},
	{
		id: '5055',
		section: 'METEOROLOGIA E AEROLOGIA',
		text: "Il calo di temperatura dell'aria, che si solleva adiabaticamente di un certo valore di quota senza condensazione del vapore acqueo, si chiama:",
		answers: [
			"gradiente termico verticale e dipende dall'ora e dalla località in cui il fenomeno si verifica.",
			"gradiente adiabatico secco (o gradiente termico dell'adiabatica secca) e dipende principalmente dall'ora e dalla località in cui il fenomeno si verifica.",
			"gradiente adiabatico secco (o gradiente termico dell'adiabatica secca) e si può affermare con buona approssimazione che non dipende dall'ora e dalla località in cui il fenomeno si verifica."
		],
		correct_answer_index: 2
	},
	{
		id: '5056',
		section: 'METEOROLOGIA E AEROLOGIA',
		text: "L'aria che si solleva adiabaticamente contiene una certa quantità di vapore acqueo. Al diminuire della temperatura dell'aria si raggiungono le condizioni per cui il vapore acqueo inizia a condensare (temperatura dell'aria = temperatura di rugiada, umidità relativa = 100%). L'ulteriore salita dell'aria determina un calo di temperatura di:",
		answers: [
			'1°C ogni 100 m (Il gradiente è sostanzialmente costante con la quota).',
			'0.5°C circa ogni 100 m (Il gradiente non è costante con la quota, ma al diminuire della temperatura esso tende ad aumentare).',
			'2°C circa ogni 100 m.'
		],
		correct_answer_index: 1
	},
	{
		id: '5057',
		section: 'METEOROLOGIA E AEROLOGIA',
		text: 'Come chiamiamo il sollevamento di aria alla presenza di fenomeni di condensazione del vapore acqueo?',
		answers: [
			'Sollevamento adiabatico saturo o in regime di saturazione.',
			'Sollevamento adiabatico anomalo perché in condizioni di saturazione.',
			'Sollevamento adiabatico secco perché in condizioni di non saturazione.'
		],
		correct_answer_index: 0
	},
	{
		id: '5058',
		section: 'METEOROLOGIA E AEROLOGIA',
		text: "Se il gradiente termico verticale della giornata è superiore ad 1° C ogni 100 m l'aria si definisce:",
		answers: ['stabile.', 'instabile.', 'dotata di equilibrio indifferente.'],
		correct_answer_index: 1
	},
	{
		id: '5059',
		section: 'METEOROLOGIA E AEROLOGIA',
		text: "Il fattore che ci indica se l'aria è stabile o instabile è:",
		answers: [
			"il gradiente adiabatico secco dell'aria.",
			'il gradiente termico verticale.',
			"il gradiente adiabatico saturo dell'aria."
		],
		correct_answer_index: 1
	},
	{
		id: '5060',
		section: 'METEOROLOGIA E AEROLOGIA',
		text: "Se l'aria risulta instabile dall'osservazione del suo gradiente termico verticale ci dovremo attendere che:",
		answers: [
			"una bolla d'aria che si stacca dal suolo dotata di moto convettivo arresti la sua salita molto presto.",
			"una bolla d'aria che si stacca dal suolo dotata di moto convettivo continui nella sua salita con velocità sempre maggiore.",
			"una bolla d'aria che raggiunge una temperatura di poco superiore a quella dell'aria circostante riesca comunque a staccarsi dal suolo."
		],
		correct_answer_index: 1
	},
	{
		id: '5061',
		section: 'METEOROLOGIA E AEROLOGIA',
		text: 'Una massa d\'aria molto umida, caratterizzata da diffuse formazioni nuvolose, si dice "stabile" quando:',
		answers: [
			'il suo gradiente termico verticale è inferiore al gradiente adiabatico saturo.',
			'il suo gradiente termico verticale è superiore ad 1°C ogni 100 m.',
			'il suo gradiente termico verticale è inferiore al gradiente adiabatico secco.'
		],
		correct_answer_index: 0
	},
	{
		id: '5062',
		section: 'METEOROLOGIA E AEROLOGIA',
		text: "Se il gradiente termico verticale di una massa d'aria asciutta (cioè non satura) è inferiore ad 1°C ogni 100 m si dice che essa è:",
		answers: ['stabile.', 'instabile.', 'dotata di equilibrio indifferente.'],
		correct_answer_index: 0
	},
	{
		id: '5063',
		section: 'METEOROLOGIA E AEROLOGIA',
		text: "A una certa quota la temperatura ambiente dell'aria è pari a 12°C. Se una bolla d'aria salendo si trova ad avere una temperatura di 14°C alla stessa quota essa:",
		answers: [
			'si arresterà immediatamente.',
			'inizierà sicuramente a scendere.',
			'continueràuramente la sua salita.'
		],
		correct_answer_index: 2
	},
	{
		id: '5064',
		section: 'METEOROLOGIA E AEROLOGIA',
		text: "Se una bolla d'aria contenente un'alta percentuale di umidità relativa inizia a salire dotata di moto convettivo, in che modo la condensazione del vapore acqueo influenza la sua salita?",
		answers: [
			'Probabilmente ne interrompe il moto ascensionale.',
			'Sicuramente ne accelera il moto ascensionale.',
			'Probabilmente la condensazione del vapore acqueo non influenza il moto ascensionale.'
		],
		correct_answer_index: 1
	},
	{
		id: '5065',
		section: 'METEOROLOGIA E AEROLOGIA',
		text: "Se l'aria è moderatamente instabile, una bolla d'aria umida che inizia a salire perché riscaldata dal terreno più dell'aria circostante, raggiunta la quota di condensazione:",
		answers: [
			'salirà sicuramente più veloce.',
			'si arresterà sicuramente.',
			'inizierà una rapida discesa.'
		],
		correct_answer_index: 0
	},
	{
		id: '5066',
		section: 'METEOROLOGIA E AEROLOGIA',
		text: "Se l'aria è molto stabile, una bolla d'aria che per motivi convettivi inizi a salire staccandosi dal terreno:",
		answers: [
			'continuerà a salire sempre più velocemente.',
			'salirà almeno sino alla quota di condensazione.',
			'si arresterà quanto prima venendo a mancare la spinta di galleggiamento o di Archimede.'
		],
		correct_answer_index: 2
	},
	{
		id: '5067',
		section: 'METEOROLOGIA E AEROLOGIA',
		text: 'Supponendo di essere in presenza di aria umida ed instabile associata a condizioni di forte riscaldamento del terreno, vi è la possibilità che si creino:',
		answers: [
			'forti correnti ascensionali e nubi cumuliformi.',
			'forti correnti ascensionali ma non certo nubi cumuliformi.',
			'nebbia e nubi stratificate.'
		],
		correct_answer_index: 0
	},
	{
		id: '5068',
		section: 'METEOROLOGIA E AEROLOGIA',
		text: "I moti termo-convettivi dell'aria sono:",
		answers: [
			"moti orizzontali di masse d'aria da zone di alta pressione a zone di bassa.",
			"moti ascensionali di aria che è forzata verso l'alto dalla presenza di rilievi.",
			'moti ascensionali di aria che, più calda di quella circostante, tende a sollevarsi grazie alla spinta di galleggiamento o di Archimede.'
		],
		correct_answer_index: 2
	},
	{
		id: '5069',
		section: 'METEOROLOGIA E AEROLOGIA',
		text: "Quando il vento al suolo è assente o per lo più debole, l'attività termo-convettiva in pianura e nelle valli dà luogo a:",
		answers: [
			'vento di gradiente.',
			'bolle o colonne termiche dotate di moto ascensionale.',
			'formazioni nuvolose a carattere stratificato.'
		],
		correct_answer_index: 1
	},
	{
		id: '5070',
		section: 'METEOROLOGIA E AEROLOGIA',
		text: 'Le bolle termiche saranno facilitate a staccarsi da terra, a parità di altre condizioni, da:',
		answers: [
			'calma di vento su superfici prive di ostacoli.',
			'leggero venticello su superfici irte di ostacoli.',
			'leggero venticello su superfici prive di ostacoli.'
		],
		correct_answer_index: 1
	},
	{
		id: '5071',
		section: 'METEOROLOGIA E AEROLOGIA',
		text: 'I moti termo-convettivi sono determinati principalmente:',
		answers: [
			"da condizioni di stabilità dell'aria.",
			"da condizioni di forte umidità dell'aria.",
			"da forte riscaldamento del terreno e dal conseguente riscaldamento per conduzione dell'aria sovrastante."
		],
		correct_answer_index: 2
	},
	{
		id: '5072',
		section: 'METEOROLOGIA E AEROLOGIA',
		text: 'La differente natura e colorazione del terreno favorisce:',
		answers: [
			"il crearsi delle condizioni di instabilità dell'aria.",
			'il crearsi del vento di gradiente.',
			'il distacco di bolle o colonne termiche.'
		],
		correct_answer_index: 2
	},
	{
		id: '5073',
		section: 'METEOROLOGIA E AEROLOGIA',
		text: 'Se non vi è umidità sufficiente a consentire il raggiungimento delle condizioni di saturazione del vapore acqueo, le termiche che si formeranno saranno chiamate:',
		answers: ['termiche secche o blu.', 'termiche adiabatiche.', 'termiche convettive.'],
		correct_answer_index: 0
	},
	{
		id: '5074',
		section: 'METEOROLOGIA E AEROLOGIA',
		text: "Se l'aria è sufficientemente umida potranno essere evidenziate le termiche esistenti e da che cosa?",
		answers: [
			'Si, dalla formazione di nubi stratificate ad una certa quota.',
			'Si, dalla formazione di nubi cumuliformi ad una certa quota.',
			'Si, ma comunque non dalla presenza di alcun tipo di nube.'
		],
		correct_answer_index: 1
	},
	{
		id: '5075',
		section: 'METEOROLOGIA E AEROLOGIA',
		text: 'Durante le ore più calde su quale tipo di terreno ci si può attendere con più probabilità di trovare movimento convettivo di aria?',
		answers: ['Su prati verdi.', 'Su una superficie acquea.', 'Su un terreno roccioso.'],
		correct_answer_index: 2
	},
	{
		id: '5076',
		section: 'METEOROLOGIA E AEROLOGIA',
		text: "Oltre al moto convettivo dell'aria riscaldata per conduzione dal terreno sottostante, si può verificare un movimento ascensionale dell'aria per altri motivi?",
		answers: [
			'Si, per sollevamento forzato in presenza di vento in corrispondenza di rilievi.',
			'Si, per sollevamento forzato in presenza di vento sulle pianure.',
			'No.'
		],
		correct_answer_index: 0
	},
	{
		id: '5077',
		section: 'METEOROLOGIA E AEROLOGIA',
		text: "Come si chiama il sollevamento dell'aria generato dalla presenza di vento in corrispondenza di rilievi montuosi?",
		answers: [
			'Sollevamento dinamico o "dinamica di pendio" in gergo volo liberistico.',
			'Sollevamento adiabatico.',
			'Sollevamento termodinamico.'
		],
		correct_answer_index: 0
	},
	{
		id: '5078',
		section: 'METEOROLOGIA E AEROLOGIA',
		text: 'Può un iniziale sollevamento dinamico generato dalla presenza di vento e di rilievi montuosi trasformarsi in sollevamento termico puro?',
		answers: [
			"Si, solo in presenza di condizioni di stabilità dell'aria.",
			"Si, in presenza di particolari condizioni di instabilità dell'aria, con molte più probabilità al di sopra della quota di condensazione.",
			"No, neppure in presenza di particolari condizioni di instabilità dell'aria."
		],
		correct_answer_index: 1
	},
	{
		id: '5079',
		section: 'METEOROLOGIA E AEROLOGIA',
		text: "Che cosa si potrà verificare qualora si stacchino delle bolle termiche alla presenza di vento moderato che sospinge l'aria su per un pendio?",
		answers: [
			'Che si generino correnti ascensionali di notevole intensità.',
			'Che si generino solamente condizioni di forte turbolenza.',
			'Che prevalgano comunque le condizioni di "dinamica" rispetto a quelle di "termica".'
		],
		correct_answer_index: 0
	},
	{
		id: '5080',
		section: 'METEOROLOGIA E AEROLOGIA',
		text: "Che cosa s'intende per inversione termica?",
		answers: [
			"Una diminuzione anomala della temperatura dell'aria ad una certa quota.",
			"Un andamento anomalo della temperatura dell'aria, quando essa aumenta con l'aumentare della quota.",
			"L'inversione di moto di una bolla la cui temperatura ha raggiunto il valore di quella dell'aria circostante."
		],
		correct_answer_index: 1
	},
	{
		id: '5081',
		section: 'METEOROLOGIA E AEROLOGIA',
		text: "Quando si verifica un'inversione termica in prossimità del suolo può accadere che:",
		answers: [
			'si formi qualche nube cumuliforme con base quasi sul terreno.',
			'la visibilità aumenti considerevolmente in corrispondenza del suolo stesso.',
			'si formi nebbia al suolo durante le ore notturne.'
		],
		correct_answer_index: 2
	},
	{
		id: '5082',
		section: 'METEOROLOGIA E AEROLOGIA',
		text: "Come si riconosce dal pendio di decollo la presenza di un eventuale strato d'inversione sottostante?",
		answers: [
			'Dalla presenza di foschia sotto lo strato di inversione, caratterizzata da un limite piuttosto netto.',
			'Dalla presenza di nubi convettive a partire dalla base dello strato stesso.',
			"Dalla presenza di una situazione di grande visibilità al di sotto della base dello strato d'inversione."
		],
		correct_answer_index: 0
	},
	{
		id: '5083',
		section: 'METEOROLOGIA E AEROLOGIA',
		text: "Al decollo da un pendio, la presenza di uno strato d'inversione che tipo di messaggi può suggerirci?",
		answers: [
			'Nessun messaggio meteorologico o aerologico particolare.',
			"Messaggi di sospetta possibile turbolenza anche forte e comunque di cambio delle condizioni aerologiche all'attraversamento della base dello strato stesso.",
			'Qualche messaggio riguardante la possibilità di formazioni cumuliformi sopra lo strato stesso.'
		],
		correct_answer_index: 1
	},
	{
		id: '5084',
		section: 'METEOROLOGIA E AEROLOGIA',
		text: 'Che cosa s\'intende per "perturbazione meteorologica" causata dal passaggio di un fronte?',
		answers: [
			"Il corpo nuvoloso ed i fenomeni associati alla presenza di una superficie di discontinuità esistente tra due masse d'aria aventi caratteristiche fisiche diverse.",
			"Il corpo nuvoloso associato alle rapide variazioni di pressione atmosferica al suolo dovuta all'avanzare delle masse d'aria.",
			"Il corpo nuvoloso associato a forti venti su rilievi montuosi quando le masse d'aria si muovono sul terreno."
		],
		correct_answer_index: 0
	},
	{
		id: '5085',
		section: 'METEOROLOGIA E AEROLOGIA',
		text: "Che cos'è un fronte caldo?",
		answers: [
			"È la superficie di separazione tra una massa d'aria fredda che spostandosi raggiunge una massa d'aria più calda.",
			"È la superficie di separazione tra una massa d'aria calda che spostandosi raggiunge una massa d'aria più fredda.",
			'È un fenomeno non legato ad alcun evento meteorologico.'
		],
		correct_answer_index: 1
	},
	{
		id: '5086',
		section: 'METEOROLOGIA E AEROLOGIA',
		text: 'Quali fenomeni meteorologici genera normalmente un fronte caldo al suo passaggio?',
		answers: [
			'Nubi a sviluppo prevalentemente verticale (tipicamente Cumuli congesti, Cumulonembi), precipitazioni violente ed a carattere discontinuo o in forma di rovescio, con aumento della temperatura media.',
			'Nubi a sviluppo prevalentemente orizzontale a quote diverse (tipicamente Nembostrati, Altostrati e Strati), precipitazioni mediamente non violente ma a carattere continuo con aumento della temperatura media.',
			'Nubi a sviluppo orizzontale molto basse (tipicamente Strati e Stratocumuli), precipitazioni solo a carattere discontinuo e violento con aumento della temperatura media.'
		],
		correct_answer_index: 1
	},
	{
		id: '5087',
		section: 'METEOROLOGIA E AEROLOGIA',
		text: "Che cos'è un fronte freddo?",
		answers: [
			"È la superficie di separazione tra una massa d'aria fredda che spostandosi raggiunge una massa d'aria più calda.",
			"È la superficie di separazione tra una massa d'aria calda che spostandosi raggiunge una massa d'aria più fredda.",
			'È un fenomeno non legato ad alcun evento meteorologico.'
		],
		correct_answer_index: 0
	},
	{
		id: '5088',
		section: 'METEOROLOGIA E AEROLOGIA',
		text: 'Quali fenomeni meteorologici genera normalmente un fronte freddo al suo passaggio?',
		answers: [
			'Nubi a sviluppo orizzontale, precipitazioni a carattere debole e continuo con diminuzione della temperatura.',
			"Nubi a sviluppo verticale, precipitazioni a carattere debole e continuo con diminuzione della temperatura e condizioni di stabilità dell'aria dopo il passaggio del fronte stesso.",
			"Nubi a sviluppo verticale, precipitazioni a carattere violento e discontinuo con diminuzione della temperatura e condizioni di instabilità dell'aria dopo il passaggio del fronte stesso."
		],
		correct_answer_index: 2
	},
	{
		id: '5089',
		section: 'METEOROLOGIA E AEROLOGIA',
		text: "Presenza di nubi cumuliformi a ingente sviluppo verticale (tipicamente Cumuli congesti e Cumulonembi) e condizioni d'instabilità dell'aria sono generalmente associate al passaggio di:",
		answers: [
			'un fronte freddo.',
			'un fronte caldo.',
			'una forte inversione termica alle quote medie.'
		],
		correct_answer_index: 0
	},
	{
		id: '5090',
		section: 'METEOROLOGIA E AEROLOGIA',
		text: 'Le nubi stratiformi, anche di notevole spessore (tipicamente Nembostrati più o meno accompagnati da Altostrati e Strati) sono generalmente associate al passaggio di:',
		answers: [
			'un fronte freddo.',
			'un fronte caldo.',
			'un fronte caldo o freddo su rilievi montuosi.'
		],
		correct_answer_index: 1
	},
	{
		id: '5091',
		section: 'METEOROLOGIA E AEROLOGIA',
		text: "Che cosa s'intende per fronte occluso?",
		answers: [
			"Una perturbazione complessa formata dall'insieme di un fronte freddo che ha raggiunto un fronte caldo e che da luogo a tutti i fenomeni meteorologici caratteristici di entrambi i fronti.",
			'Una perturbazione a carattere freddo che in effetti dà luogo anche a tutti i fenomeni meteorologici tipici di quelle a carattere caldo.',
			'Una perturbazione a carattere caldo che in effetti dà luogo anche a tutti i fenomeni meteorologici tipici di quelle a carattere freddo.'
		],
		correct_answer_index: 0
	},
	{
		id: '5092',
		section: 'METEOROLOGIA E AEROLOGIA',
		text: 'In base alla classificazione convenzionale delle nubi, sono considerate nubi del livello basso:',
		answers: [
			'Strati, Nembostrati, Cirrostrati.',
			'Strati, Stratocumuli.',
			'Cumuli, Cirrocumuli, Stratocumuli, Cumulonembi.'
		],
		correct_answer_index: 1
	},
	{
		id: '5093',
		section: 'METEOROLOGIA E AEROLOGIA',
		text: 'In base alla classificazione convenzionale delle nubi, sono considerate nubi del livello medio:',
		answers: [
			'Altostrati e Altocumuli.',
			'Cumulonembi e Altostrati.',
			'Altostrati, Altocumuli e Cirrocumuli.'
		],
		correct_answer_index: 0
	},
	{
		id: '5094',
		section: 'METEOROLOGIA E AEROLOGIA',
		text: 'In base alla classificazione convenzionale delle nubi, sono considerate nubi del livello alto:',
		answers: [
			'Altocumuli e Altostrati.',
			'Altocumuli e Cumulonembi.',
			'Cirri, Cirrostrati e Cirrocumuli.'
		],
		correct_answer_index: 2
	},
	{
		id: '5095',
		section: 'METEOROLOGIA E AEROLOGIA',
		text: 'A quale famiglia di nubi appartengono i Cumuli?',
		answers: [
			'Nubi a sviluppo verticale o convettive.',
			'Nubi medie a sviluppo verticale.',
			'Nubi basse a sviluppo verticale.'
		],
		correct_answer_index: 0
	},
	{
		id: '5096',
		section: 'METEOROLOGIA E AEROLOGIA',
		text: 'Come può essere definito il Cumulo congesto?',
		answers: [
			'Un Cumulo in fase evolutiva avanzata caratterizzato da un elevato sviluppo verticale.',
			'Un Cumulo di tipo particolare in fase iniziale di formazione.',
			"Un Cumulo che non riesce a svilupparsi completamente e a scaricare l'energia termodinamica accumulata."
		],
		correct_answer_index: 0
	},
	{
		id: '5097',
		section: 'METEOROLOGIA E AEROLOGIA',
		text: 'Che cosa è un Cumulonembo?',
		answers: [
			'Un particolare tipo di Cumulo la cui base è piatta e densa appunto come un Nembostrato.',
			'Una nube cumuliforme al culmine della sua fase evolutiva, caratterizzata dalla violenza dei fenomeni meteorologici a essa associati quali: precipitazioni a carattere temporalesco, fenomeni elettrostatici, formazioni di ghiaccio e wind shear verticale ed orizzontale.',
			"Un particolare tipo di Cumulo, capace di generare fenomeni temporaleschi, che si forma esclusivamente in zone montuose d'estate al passaggio di una perturbazione a carattere freddo."
		],
		correct_answer_index: 1
	},
	{
		id: '5098',
		section: 'METEOROLOGIA E AEROLOGIA',
		text: 'In relazione al Volo Libero il Cumulonembo può essere considerato come:',
		answers: [
			'una nube di grande utilità per il volo.',
			'una nube decisamente pericolosa per il volo.',
			'una nube che non riveste alcuna importanza ai fini del volo.'
		],
		correct_answer_index: 1
	},
	{
		id: '5099',
		section: 'METEOROLOGIA E AEROLOGIA',
		text: 'Qual è la sequenza tipica di sviluppo delle nubi convettive?',
		answers: [
			'Strato, Altocumulo, Cumulonembo, Cumulo.',
			'Nembostrato, Stratocumulo, Cumulonembo, Cumulo.',
			'Cumulo di ridotte dimensioni, Cumulo congesto, Cumulonembo.'
		],
		correct_answer_index: 2
	},
	{
		id: '5100',
		section: 'METEOROLOGIA E AEROLOGIA',
		text: 'La presenza di nubi stratificate è positiva ai fini del Volo Libero, per la possibilità di correnti ascensionali?',
		answers: [
			'Si, in quanto sono possibili voli di distanza.',
			'Si, ma purtroppo sono associate a condizioni di scarsa visibilità.',
			'Praticamente no.'
		],
		correct_answer_index: 2
	},
	{
		id: '5101',
		section: 'METEOROLOGIA E AEROLOGIA',
		text: 'La presenza di dense nubi stratificate a varie quote, esclude la possibilità che vi siano anche formazioni nuvolose cumuliformi consistenti?',
		answers: [
			'Si, perché le nubi stratificate sono sintomo di fronte caldo nel quale non è possibile incontrare nubi convettive.',
			"No, perché l'aumento di temperatura dovuto al fronte caldo cui sono associate le nubi stratificate può dar luogo a sollevamento di aria con conseguente formazione di nubi a carattere convettivo.",
			'No, perché le nubi stratificate potrebbero essere dovute al passaggio di un fronte occluso che può dar luogo altresì al formarsi di nubi convettive ed addirittura a carattere temporalesco.'
		],
		correct_answer_index: 2
	},
	{
		id: '5102',
		section: 'METEOROLOGIA E AEROLOGIA',
		text: "Quando un forte vento in quota interessa zone montuose, sovente s'innesca un fenomeno ondulatorio che è caratterizzato dalla presenza di:",
		answers: [
			'nubi stratificate alte del genere Cirrocumuli che tendono a stratificarsi in Cirrostrati per poi evolvere in Cumuli evidenziando il fenomeno ondulatorio.',
			'nubi stratificate basse del genere Strato, indice di moti ondulatori.',
			"nubi lenticolari (in genere Altocumuli, ma talvolta anche Stratocumuli e/o Cirrocumuli) e nubi rotoriche (Cumulus fractus) che evidenziano il fenomeno dell'onda orografica."
		],
		correct_answer_index: 2
	},
	{
		id: '5103',
		section: 'METEOROLOGIA E AEROLOGIA',
		text: 'Una delle caratteristiche delle nubi lenticolari è:',
		answers: [
			'la tipica forma a sezione aerodinamica, simile a quella di una mandorla.',
			'il loro sviluppo verticale, nettamente superiore a quello orizzontale.',
			'la velocità di spostamento della nube.'
		],
		correct_answer_index: 0
	},
	{
		id: '5104',
		section: 'METEOROLOGIA E AEROLOGIA',
		text: 'Oltre al vento di gradiente è tipica del microclima di zone vallive e montuose la presenza di:',
		answers: [
			'brezze di monte la sera e brezze di valle il mattino.',
			'brezze di monte durante la notte e il mattino presto, brezze di valle durante le ore calde della giornata.',
			"brezze che variano d'intensità e direzione in funzione del luogo, ma sono costanti a tutte le ore del giorno e della notte."
		],
		correct_answer_index: 1
	},
	{
		id: '5105',
		section: 'METEOROLOGIA E AEROLOGIA',
		text: 'In zone marittime durante la giornata, a causa del diverso riscaldamento delle superfici acquee rispetto alle superfici terrestri, si generano:',
		answers: [
			'brezze dal mare durante le ore calde della giornata, e viceversa durante la notte.',
			'brezze da terra durante le ore calde della giornata e viceversa durante la notte.',
			'solo brezze dal mare durante le ore calde della giornata e non viceversa durante la notte.'
		],
		correct_answer_index: 0
	},
	{
		id: '5106',
		section: 'METEOROLOGIA E AEROLOGIA',
		text: 'Generalmente le brezze di valle danno luogo a correnti di pendio anche sui versanti laterali delle valli stesse?',
		answers: [
			'Si, dipendentemente dalla morfologia del terreno.',
			'Si, indipendentemente dalla morfologia del terreno.',
			'No, in nessun caso.'
		],
		correct_answer_index: 0
	},
	{
		id: '5107',
		section: 'METEOROLOGIA E AEROLOGIA',
		text: "E' possibile che durante la giornata a causa della brezza di valle si formino nubi cumuliformi anche imponenti?",
		answers: [
			"Si, perché la brezza solleva aria lungo i pendii montuosi causando possibili fenomeni nuvolosi da sollevamento che in condizioni d'instabilità possono essere anche imponenti.",
			"Si, perché la brezza si riscalda per attrito col terreno, quindi inizia a salire se in regime d'instabilità causando quindi possibili fenomeni nuvolosi da sollevamento.",
			'No, i regimi di brezza non danno mai luogo a fenomeni di sollevamento e condensazione.'
		],
		correct_answer_index: 0
	},
	{
		id: '5108',
		section: 'METEOROLOGIA E AEROLOGIA',
		text: 'Può una brezza di valle essere tanto forte da costituire un rischio per i praticanti del Volo Libero?',
		answers: [
			'Si, particolarmente in corrispondenza delle creste spartiacque.',
			'Si, particolarmente in corrispondenza di strozzature o svolte a gomito della valle e del fondo valle stesso, per effetto Venturi.',
			'No, per nessun motivo.'
		],
		correct_answer_index: 1
	},
	{
		id: '5109',
		section: 'METEOROLOGIA E AEROLOGIA',
		text: 'Quando un forte vento impatta di traverso una cresta o un crinale:',
		answers: [
			"l'aria sottovento a essi è in sostanza calma.",
			"l'aria sopravvento a essi è certamente vorticosa e turbolenta.",
			'sottovento ad essi è certa la presenza di rotori e turbolenza.'
		],
		correct_answer_index: 2
	},
	{
		id: '5110',
		section: 'METEOROLOGIA E AEROLOGIA',
		text: 'Quando una valle è investita da vento forte la cui direzione è in sostanza parallela a quella del suo asse ci possiamo attendere:',
		answers: [
			'vento forte a scorrimento laminare.',
			'vento forte anche a raffiche con presenza di rotori con asse pressoché parallelo alle linee di massima pendenza dei pendii laterali della valle stessa.',
			"vento forte in presenza di rotori di diametro minimo con asse generalmente parallelo all'asse della valle stessa."
		],
		correct_answer_index: 1
	},
	{
		id: '5111',
		section: 'METEOROLOGIA E AEROLOGIA',
		text: 'Quando una valle è interessata da vento forte la cui direzione forma un angolo superiore a 45° rispetto al suo asse ci possiamo attendere:',
		answers: [
			'vento quasi calmo lungo i pendii vallivi, ma forte al fondo valle.',
			'vento a raffiche dovunque, con direzione improvvisamente variabile, sintomo della presenza di rotori stazionari e migratori.',
			'vento anche forte ma a scorrimento laminare con direzione costante.'
		],
		correct_answer_index: 1
	},
	{
		id: '5112',
		section: 'METEOROLOGIA E AEROLOGIA',
		text: 'Se un rilievo isolato e tondeggiante è investito dal vento, si genereranno facilmente correnti ascensionali?',
		answers: [
			"Si, perché il vento è costretto comunque a scavalcare l'ostacolo.",
			'Dipende unicamente dalla natura del terreno.',
			"No, perché il vento tende comunque ad aggirare l'ostacolo."
		],
		correct_answer_index: 2
	},
	{
		id: '5113',
		section: 'METEOROLOGIA E AEROLOGIA',
		text: "E' possibile che un rotore che si forma per effetto del vento in corrispondenza di un crinale o una cresta spartiacque dia luogo ad ascendenza costante o quasi?",
		answers: [
			'No, in nessun caso.',
			'Si, ma solo sul versante sopravento.',
			'Si, anche nel versante sottovento se il rotore è pressoché stazionario e interessa il pendio con la sua parte ascendente.'
		],
		correct_answer_index: 2
	},
	{
		id: '5114',
		section: 'METEOROLOGIA E AEROLOGIA',
		text: 'La presenza di rotori sul pendio assolato di un versante vallivo situato in sottovento:',
		answers: [
			'facilita il distacco di termiche anche consistenti e violente dette appunto "di sottovento".',
			"non ha nulla a che vedere con l'attività termica del pendio.",
			'impedisce il distacco di ogni tipo di termica.'
		],
		correct_answer_index: 0
	},
	{
		id: '5115',
		section: 'METEOROLOGIA E AEROLOGIA',
		text: 'A volte la presenza di rotori di sottovento specialmente in corrispondenza di crinali e creste elevate è segnalata:',
		answers: [
			'da formazioni nuvolose dotate di grande velocità di spostamento.',
			'da una particolare foschia nelle zone adiacenti il pendio sottovento.',
			'dalla presenza di nubi rotoriche stazionarie che si formano e si dissolvono continuamente e velocemente.'
		],
		correct_answer_index: 2
	},
	{
		id: '5116',
		section: 'METEOROLOGIA E AEROLOGIA',
		text: "Quando una catena montuosa è interessata dall'avvezione di una massa d'aria molto umida che tende a scavalcarla, si determinano particolari fenomeni detti:",
		answers: [
			'Stau sopravento con pesanti formazioni nuvolose e conseguenti precipitazioni, Foehn sottovento con vento a raffiche più caldo e secco.',
			'Foehn sopravento con vento a raffiche caldo e secco, Stau sottovento con pesanti formazioni nuvolose e conseguenti precipitazioni.',
			'Stau e Foehn, con uguali conseguenze meteorologiche e climatiche sopravento e sottovento.'
		],
		correct_answer_index: 0
	},
	{
		id: '5117',
		section: 'METEOROLOGIA E AEROLOGIA',
		text: 'Nelle zone alpine del versante italiano, alla presenza del fenomeno di Foehn, sarà presente:',
		answers: [
			'aumento della temperatura, forte vento laminare caldo e secco, assenza di rotori e turbolenza.',
			'aumento della temperatura, forte vento a raffiche caldo e secco, presenza di rotori e turbolenza.',
			'aumento della temperatura, forte vento laminare caldo e umido, assenza di rotori e turbolenza.'
		],
		correct_answer_index: 1
	},
	{
		id: '5118',
		section: 'METEOROLOGIA E AEROLOGIA',
		text: "In presenza di una catena montuosa alta 3000 m aria umida ad una temperatura di pianura di 10°C si solleva dando luogo allo Stau sino in cresta e al Foehn in sottovento. Se la quota di condensazione sopravvento è di 1000 m quale sarà la temperatura dell'aria all'arrivo in pianura appena sotto alla catena montuosa?",
		answers: ['La stessa che sopravvento, cioè 10°C.', '13°C', 'Circa 20°C.'],
		correct_answer_index: 2
	},
	{
		id: '5119',
		section: 'METEOROLOGIA E AEROLOGIA',
		text: "Alla presenza di una catena montuosa alta 3000 m aria umida ad una temperatura di pianura di 10°C si solleva dando luogo a Stau sino in cresta e Foehn sottovento. Se la quota di condensazione sopravento è di 2000 m quale sarà la temperatura dell'aria all'arrivo in pianura appena sotto alla catena montuosa?",
		answers: ['La stessa che sopravvento, cioè 10°C', 'Circa 15°C.', '20°C'],
		correct_answer_index: 1
	},
	{
		id: '5120',
		section: 'METEOROLOGIA E AEROLOGIA',
		text: "Quale tipo di microclima può avere una località posta immediatamente sottovento a una catena montuosa come quella alpina, rispetto a spostamenti di masse d'aria d'origine atlantica provenienti abitualmente dalla pianura francese?",
		answers: [
			'Piuttosto siccitoso e ventoso a causa dei fenomeni di Foehn.',
			'Molto umido e piovoso.',
			'Molto più freddo di quello esistente immediatamente sopravento.'
		],
		correct_answer_index: 0
	},
	{
		id: '6001',
		section: 'STRUMENTI',
		text: "Che cos'è l'altimetro?",
		answers: [
			'È lo strumento che misura sempre la distanza di un apparecchio dal suolo.',
			'È lo strumento che misura la velocità verticale di un apparecchio.',
			"È lo strumento che misura l'altitudine di un apparecchio rispetto ad un punto noto come, ad esempio, il livello del mare."
		],
		correct_answer_index: 2
	},
	{
		id: '6002',
		section: 'STRUMENTI',
		text: 'Come funziona normalmente un altimetro?',
		answers: [
			"Misura la pressione atmosferica e quindi l'altitudine, utilizzando una capsula aneroide o un sensore elettronico.",
			"Misura l'elevazione sul livello del mare utilizzando un sensore elettronico.",
			"Misura la velocità verticale rispetto all'aria utilizzando un sensore elettronico."
		],
		correct_answer_index: 0
	},
	{
		id: '6003',
		section: 'STRUMENTI',
		text: 'Per quale motivo un altimetro necessita di regolazioni?',
		answers: [
			"Perché la temperatura dell'aria varia in relazione alle condizioni atmosferiche ed al variare dell'altitudine.",
			"Perché la pressione atmosferica varia in relazione alle condizioni atmosferiche e non solo in relazione all'altitudine.",
			"Perché la pressione atmosferica varia al variare dell'altitudine."
		],
		correct_answer_index: 1
	},
	{
		id: '6004',
		section: 'STRUMENTI',
		text: "Dopo aver regolato l'altimetro all'altitudine di decollo, effettuiamo il volo. Se all'atterraggio esso ci indica un'altitudine diversa da quella conosciuta, cosa può essere accaduto?",
		answers: [
			'La pressione atmosferica è cambiata.',
			"L'altimetro si è sicuramente guastato.",
			"La temperatura dell'aria è cambiata."
		],
		correct_answer_index: 0
	},
	{
		id: '6005',
		section: 'STRUMENTI',
		text: 'Se regoliamo il nostro altimetro in base alla pressione presente al livello del mare (QNH), andando in volo potremo conoscere:',
		answers: [
			"l'altezza geometrica sul terreno sottostante.",
			"l'altitudine sul livello medio del mare.",
			"l'elevazione sul livello medio della terra."
		],
		correct_answer_index: 1
	},
	{
		id: '6006',
		section: 'STRUMENTI',
		text: 'Cosa è il variometro?',
		answers: [
			'È lo strumento che in volo misura la velocità verticale.',
			'È lo strumento che in volo misura le altitudini rispetto al livello del mare.',
			"È lo strumento che in volo misura la velocità all'aria."
		],
		correct_answer_index: 0
	},
	{
		id: '6007',
		section: 'STRUMENTI',
		text: 'Come funziona un variometro?',
		answers: [
			"Misura la variazione istantanea della temperatura dell'aria a mezzo di un dispositivo elettronico.",
			'Misura le variazioni anche minime di pressione atmosferica a mezzo di un barometro differenziale o di un sensore elettronico.',
			'Misura le variazioni di pressione atmosferica a mezzo di un barometro a colonna.'
		],
		correct_answer_index: 1
	},
	{
		id: '6008',
		section: 'STRUMENTI',
		text: "In quali situazioni l'uso di un variometro può essere di grande aiuto per la sicurezza in volo?",
		answers: [
			"Ad esempio, volando con copertura nuvolosa o sotto un cumulo, le indicazioni del variometro ci possono aiutare a capire se c'è aspirazione e se è il caso o meno di affrettare la discesa verso l'atterraggio o dirigersi verso zone non soggette al fenomeno.",
			'Nel volo di dinamica, in quanto ci aiuta a capire dove si sale meglio, permettendoci di prolungare il volo senza rischi.',
			'Non è uno strumento da considerare utile ai fini della sicurezza del volo, ma solo come ausilio per il veleggiamento.'
		],
		correct_answer_index: 0
	},
	{
		id: '6009',
		section: 'STRUMENTI',
		text: "Che cosa può misurare l'anemometro durante un volo?",
		answers: [
			"È lo strumento che in volo misura la velocità all'aria.",
			'È lo strumento che in volo misura la velocità al suolo.',
			'È lo strumento che in volo misura la velocità verticale.'
		],
		correct_answer_index: 0
	},
	{
		id: '6010',
		section: 'STRUMENTI',
		text: 'Come funziona un anemometro?',
		answers: [
			'Misura la pressione statica di cui è dotato il vento relativo traducendola in indicazione di velocità.',
			"Misura direttamente l'energia cinetica di cui è dotato il vento relativo traducendola in calore.",
			'Misura la pressione dinamica di cui è dotato il vento relativo oppure la sua velocità mediante dispositivi meccanici (elichette intubate, etc.).'
		],
		correct_answer_index: 2
	},
	{
		id: '6011',
		section: 'STRUMENTI',
		text: "In quale caso l'anemometro può indicare la velocità al suolo con buona approssimazione?",
		answers: [
			'Quando il volo è effettuato in aria calma, in assenza di vento e su traiettoria poco inclinata.',
			'In tutti i casi, indipendentemente dalla traiettoria.',
			'In nessun caso.'
		],
		correct_answer_index: 0
	},
	{
		id: '6012',
		section: 'STRUMENTI',
		text: 'Che cosa è la bussola?',
		answers: [
			'È lo strumento che indica la direzione del Nord magnetico.',
			'È lo strumento che indica la direzione del Nord geografico.',
			'È lo strumento che indica la direzione del Sud geografico.'
		],
		correct_answer_index: 0
	},
	{
		id: '6013',
		section: 'STRUMENTI',
		text: 'Come funziona la bussola?',
		answers: [
			'Rileva mediante una calamita la posizione in cui si trova il Nord geografico.',
			'Rileva mediante una calamita la direzione del campo magnetico terrestre e il Nord magnetico.',
			'Rileva mediante un sistema meccanico la direzione dei meridiani terrestri.'
		],
		correct_answer_index: 1
	},
	{
		id: '6014',
		section: 'STRUMENTI',
		text: 'A cosa si deve prestare attenzione se vogliamo che la bussola funzioni nel modo più corretto possibile posizionandola tra gli strumenti?',
		answers: [
			'A nulla in particolare, la bussola indica sempre il nord magnetico.',
			'A installarla in modo che il Nord magnetico coincida con il nord geografico.',
			"All'interferenza elettromagnetica con altri apparati elettronici, tipo radiotrasmittenti e, soprattutto, apparecchi telefonici cellulari, che, entrando in funzione, possono disturbare il campo elettromagnetico influenzando l'ago della bussola."
		],
		correct_answer_index: 2
	},
	{
		id: '6015',
		section: 'STRUMENTI',
		text: "E' possibile affermare che il Nord geografico coincide con il Nord magnetico?",
		answers: ['Si.', "Dipende dalle stagioni dell'anno.", 'No.'],
		correct_answer_index: 2
	},
	{
		id: '6016',
		section: 'STRUMENTI',
		text: 'Con bussola, altimetro, anemometro e variometro è possibile effettuare attività vololiberistica in condizioni di volo strumentale, ad esempio in nube?',
		answers: [
			'Si, se adeguatamente addestrati.',
			'Si, ma solo per breve tempo, perché la dotazione di strumenti non risulta completa.',
			"No, la dotazione di strumenti non è affatto completa, manca l'informazione di posizione nello spazio."
		],
		correct_answer_index: 2
	},
	{
		id: '6017',
		section: 'STRUMENTI',
		text: 'Durante il volo, che cosa ci permette di misurare il GPS?',
		answers: ['La velocità al suolo.', "La velocità all'aria.", "L'umidità relativa."],
		correct_answer_index: 0
	},
	{
		id: '6018',
		section: 'STRUMENTI',
		text: 'Con il GPS è possibile volare con tranquillità nelle nubi?',
		answers: [
			'Si, in quanto il GPS indica la direzione in cui mi sto muovendo con esattezza.',
			'No, anche perchè nella nube la ricezione del segnale inviato dai satelliti GPS può essere disturbata, rendendo inaffidabile lo strumento.',
			'Si, ma solo se affianchiamo al GPS una bussola di tipo nautico.'
		],
		correct_answer_index: 1
	},
	{
		id: '6019',
		section: 'STRUMENTI',
		text: 'Stiamo volando in presenza di vento molto forte. La nostra prua è diretta verso SUD. Sul display del GPS leggiamo una velocità di 3 km/h, direzione NORD. Cosa succede?',
		answers: [
			'Lo strumento è evidentemente rotto.',
			"Se sono sicuro di avere la prua diretta verso SUD evidentemente sto volando all'indietro. Il vento è superiore alla mia velocità all'aria e occorre aumentare la velocità prima possibile.",
			'Non è possibile che si verifichi una situazione del genere.'
		],
		correct_answer_index: 1
	},
	{
		id: '6020',
		section: 'STRUMENTI',
		text: 'Come funziona un GPS?',
		answers: [
			'Calcola la posizione nello spazio mediante un sensore di movimento.',
			'Calcola la posizione nello spazio mediante il confronto dei segnali orari inviati da alcuni satelliti in orbita intorno alla terra.',
			'Calcola la posizione nello spazio per mezzo di un barometro differenziale.'
		],
		correct_answer_index: 1
	},
	{
		id: '7001',
		section: 'TECNICA DI PILOTAGGIO',
		text: 'Prima di recarsi al decollo in atterraggio è necessario:',
		answers: [
			'verificare le condizioni del terreno.',
			"verificare le condizioni del terreno e del vento, mettere una manica a vento se non c'è.",
			'lasciare in atterraggio mezzi e/o persone per il recupero dopo il volo.'
		],
		correct_answer_index: 1
	},
	{
		id: '7002',
		section: 'TECNICA DI PILOTAGGIO',
		text: 'Prima di intraprendere un volo di Cross Country è necessario, oltre a tutto il resto:',
		answers: [
			"nutrirsi adeguatamente, bere molto per evitare disidratazione, organizzare il recupero, dotarsi di mezzi per trascorrere eventualmente la notte all'addiaccio.",
			'provvedere a che il volo si svolga il mattino, più presto possibile, per disporre di più ore di luce.',
			"esaminare la carta aeronautica della zona, prendere nota di eventuali divieti e delle possibilità di atterraggio lungo il percorso, nonché fare un'attenta valutazione delle condizioni meteorologiche."
		],
		correct_answer_index: 2
	},
	{
		id: '7003',
		section: 'TECNICA DI PILOTAGGIO',
		text: 'Quale inclinazione del pendio, assicurata la possibilità di una graduale e corretta rincorsa, è da considerarsi ottimale e sicura per il decollo?',
		answers: [
			'Oltre 120° e sino a 35°, risultando già così nettamente superiore alla pendenza della traiettoria di volo realizzabile.',
			'Dai 35° ai 45°, in quanto solo così risulta nettamente superiore alla pendenza della traiettoria di volo realizzabile.',
			'Oltre i 45°, per ottenere un rapido distacco dal terreno con garanzia di sorvolo degli ostacoli sulla traiettoria.'
		],
		correct_answer_index: 0
	},
	{
		id: '7004',
		section: 'TECNICA DI PILOTAGGIO',
		text: 'Con quale tipo di corsa si deve effettuare il decollo in deltaplano e parapendio?',
		answers: [
			'Con falcata corta ed a velocità costante.',
			'Con falcata e velocità crescenti.',
			'Con falcata corta e rapida presa di velocità.'
		],
		correct_answer_index: 1
	},
	{
		id: '7005',
		section: 'TECNICA DI PILOTAGGIO',
		text: 'Qual è in fase di decollo con deltaplano e parapendio, la prima manovra da eseguire appena staccati da terra oltre a quelle finalizzate al controllo della direzione?',
		answers: [
			'Cabrare o trazionare i comandi rispettivamente, per non perdere eccessiva quota.',
			"Sistemarsi adeguatamente nell'imbrago.",
			'Picchiare leggermente o rilasciare un poco i freni rispettivamente, per acquisire velocità.'
		],
		correct_answer_index: 2
	},
	{
		id: '7006',
		section: 'TECNICA DI PILOTAGGIO',
		text: 'Come è possibile ottenere, a prescindere da altre condizioni, il minor tasso di caduta possibile con deltaplano e parapendio?',
		answers: [
			"Volando in linea retta ed all'incidenza massima consentita.",
			'Volando comunque al regime di massima efficienza in aria calma.',
			'Volando in linea retta ad una incidenza compresa tra quella di massima efficienza in aria calma e quella di stallo.'
		],
		correct_answer_index: 2
	},
	{
		id: '7007',
		section: 'TECNICA DI PILOTAGGIO',
		text: "Come varia l'efficienza all'aria di un'ala aumentando il vento frontale?",
		answers: [
			'Aumenta.',
			'Diminuisce.',
			"Non varia perché l'efficienza all'aria dipende solo dall'angolo d'incidenza dell'ala."
		],
		correct_answer_index: 2
	},
	{
		id: '7008',
		section: 'TECNICA DI PILOTAGGIO',
		text: 'Se vogliamo comunque realizzare la massima autonomia chilometrica in deltaplano o parapendio dovremo:',
		answers: [
			'limitare al massimo le manovre.',
			'volare più possibile in linea retta ed al regime di massima efficienza al suolo.',
			'volare più possibile in linea retta ed al regime di minimo tasso di caduta.'
		],
		correct_answer_index: 1
	},
	{
		id: '7009',
		section: 'TECNICA DI PILOTAGGIO',
		text: 'Se, in determinate condizioni aerologiche, vogliamo rimanere più tempo possibile in volo realizzando la massima autonomia oraria, dovremo:',
		answers: [
			'limitare al massimo le manovre.',
			"volare più possibile in linea retta ed al regime di massima efficienza all'aria.",
			'volare più possibile in linea retta ed al regime di minimo tasso di caduta ottenibile.'
		],
		correct_answer_index: 2
	},
	{
		id: '7010',
		section: 'TECNICA DI PILOTAGGIO',
		text: 'Passando da condizioni di aria calma a condizioni di vento frontale, quale correttivo dobbiamo apportare alla velocità per garantirci la massima efficienza al suolo possibile?',
		answers: [
			'Diminuire la velocità rispetto a quella di massima efficienza in aria calma.',
			'Aumentare la velocità rispetto a quella di massima efficienza in aria calma.',
			'Aumentare comunque la velocità sino alla massima possibile.'
		],
		correct_answer_index: 1
	},
	{
		id: '7011',
		section: 'TECNICA DI PILOTAGGIO',
		text: "Volando in deltaplano o parapendio sappiamo che l'efficienza al suolo, quando il vento frontale varia, comunque:",
		answers: ['varia.', 'varia, ma solo se il vento frontale aumenta.', 'rimane invariata.'],
		correct_answer_index: 0
	},
	{
		id: '7012',
		section: 'TECNICA DI PILOTAGGIO',
		text: "L'efficienza al suolo:",
		answers: [
			'diminuisce al diminuire del vento frontale.',
			"diminuisce all'aumentare del vento frontale.",
			"aumenta all'aumentare del vento frontale."
		],
		correct_answer_index: 1
	},
	{
		id: '7013',
		section: 'TECNICA DI PILOTAGGIO',
		text: 'In condizioni di ascendenza la massima efficienza al suolo si realizza volando:',
		answers: [
			'con una incidenza maggiore di quella corrispondente al regime di massima efficienza in aria calma.',
			'con una incidenza minore di quella corrispondente al regime di massima efficienza in aria calma.',
			"comunque con l'incidenza corrispondente al regime di massima efficienza in aria calma."
		],
		correct_answer_index: 0
	},
	{
		id: '7014',
		section: 'TECNICA DI PILOTAGGIO',
		text: 'In condizioni di discendenza la massima efficienza al suolo si realizza volando:',
		answers: [
			'con una incidenza minore di quella corrispondente al regime di massima efficienza in aria calma.',
			'con una incidenza maggiore di quella corrispondente al regime di massima efficienza in aria calma.',
			"comunque con l'incidenza corrispondente al regime di massima efficienza in aria calma."
		],
		correct_answer_index: 0
	},
	{
		id: '7015',
		section: 'TECNICA DI PILOTAGGIO',
		text: "Stiamo volando ad una velocità rispetto al suolo di 10 km/h. C'è una componente di vento contrario pari a 30 km/h. Se avessimo l'anemometro quanto indicherebbe?",
		answers: ['10 km/h.', '20 km/h.', '40 km/h.'],
		correct_answer_index: 2
	},
	{
		id: '7016',
		section: 'TECNICA DI PILOTAGGIO',
		text: "Stiamo volando ad una velocità rispetto al suolo di 60 km/h. C'è una componente di vento a favore pari a 30 km/h. Se avessimo l'anemometro quanto indicherebbe?",
		answers: ['90 km/h.', '30 km/h.', '40 km/h.'],
		correct_answer_index: 1
	},
	{
		id: '7017',
		section: 'TECNICA DI PILOTAGGIO',
		text: "A quale scopo si utilizza l'acceleratore in parapendio?",
		answers: [
			"Per aumentare l'efficienza suolo in condizioni di vento contrario.",
			'Per aumentare il tasso di caduta e ridurre la velocità orizzontale.',
			"Per aumentare l'angolo di assetto in condizioni di turbolenza."
		],
		correct_answer_index: 0
	},
	{
		id: '7018',
		section: 'TECNICA DI PILOTAGGIO',
		text: 'In presenza di vento meteorologico, come si esegue una virata di 360° la cui traccia al suolo sia più possibile circolare?',
		answers: [
			"Variando opportunamente l'inclinazione dell'ala durante la virata in funzione della deriva dovuta allo spostamento dell'aria rispetto al suolo.",
			"Accentuando l'inclinazione laterale dell'ala durante la fase della virata con vento in prua.",
			"Diminuendo l'inclinazione laterale dell'ala durante le fasi della virata con vento al traverso."
		],
		correct_answer_index: 0
	},
	{
		id: '7019',
		section: 'TECNICA DI PILOTAGGIO',
		text: 'Come si eseguono le virate in dinamica di pendio ed in prossimità dello stesso, se si vuole avere il miglior rendimento garantendosi il massimo della sicurezza?',
		answers: [
			"Eseguendo virate strette di 360° nel punto in corrispondenza del quale è massima l'ascendenza.",
			'Eseguendo lunghi "otto" con inversioni di 180° ad alti angoli di inclinazione per rimanere in virata meno possibile.',
			'Utilizzando la tecnica "a granchio" che consente di eseguire degli "otto" sul pendio evitando di assumere elevati angoli di rollio.'
		],
		correct_answer_index: 2
	},
	{
		id: '7020',
		section: 'TECNICA DI PILOTAGGIO',
		text: 'Perché si fanno virate di 360° in termica?',
		answers: [
			'Perché le termiche hanno sempre e solo un andamento ascendente elicoidale.',
			"Per potersi mantenere all'interno della corrente ascensionale.",
			'Perché in virata continua, il tasso di caduta risulta essere minore.'
		],
		correct_answer_index: 1
	},
	{
		id: '7021',
		section: 'TECNICA DI PILOTAGGIO',
		text: 'Per sfruttare meglio le condizioni il pilota, entrato in termica o in dinamica:',
		answers: [
			'interviene sui comandi per ridurre la velocità.',
			'interviene sui comandi per aumentare la velocità.',
			'non interviene più sui comandi per variare il regime di volo.'
		],
		correct_answer_index: 0
	},
	{
		id: '7022',
		section: 'TECNICA DI PILOTAGGIO',
		text: 'È possibile andare in stallo volando a velocità prossima alla massima?',
		answers: [
			'No.',
			"Si, se si diminuisce improvvisamente l'incidenza.",
			"Si, se si aumenta improvvisamente l'incidenza oltre certi valori."
		],
		correct_answer_index: 2
	},
	{
		id: '7023',
		section: 'TECNICA DI PILOTAGGIO',
		text: 'A quale velocità è opportuno volare in forte turbolenza?',
		answers: [
			'Alla minima possibile per ridurre le sollecitazioni nel delta e per garantire la massima pressione nei cassoni del parapendio.',
			'Alla massima possibile indipendentemente dalle sollecitazioni per uscirne al più presto.',
			'Ad una velocità di poco superiore a quella di massima efficienza in aria calma in delta ed alla massima compatibile con il mantenimento di adeguata pressione nei cassoni in parapendio.'
		],
		correct_answer_index: 2
	},
	{
		id: '7024',
		section: 'TECNICA DI PILOTAGGIO',
		text: 'Come si determina dal volo la direzione del vento al suolo in assenza di manica a vento?',
		answers: [
			"Osservando ogni cosa che il vento può mettere in movimento (fumo, bandiere, panni appesi, alberi) e considerando l'eventuale presenza di deriva.",
			"Osservando il segnavento del deltaplano o del parapendio se istallato, o valutando l'intensità del vento relativo in varie direzioni di volo.",
			'Osservando il movimento delle nubi che è sempre possibile mettere in relazione con il vento al suolo.'
		],
		correct_answer_index: 0
	},
	{
		id: '7025',
		section: 'TECNICA DI PILOTAGGIO',
		text: 'Che cosa si intende per circuito di avvicinamento ad "otto"?',
		answers: [
			'Un tipo di avvicinamento che consente al pilota di effettuare poche virate per arrivare in atterraggio.',
			'Un tipo di avvicinamento che, con virate di oltre 180° sempre verso la superficie di atterraggio, consente al pilota di perdere quota mantenendosi costantemente in prossimità ed in vista di esso.',
			"Un tipo di avvicinamento che consente al pilota di perdere quota facendo delle virate molto strette pur di mantenersi in prossimità dell'atterraggio."
		],
		correct_answer_index: 1
	},
	{
		id: '7026',
		section: 'TECNICA DI PILOTAGGIO',
		text: 'Che cosa si intende per circuito a "C" o aeronautico?',
		answers: [
			'Un tipo di avvicinamento composto da tre fasi distinte dette "sottovento", "base" o "virata base" e "finale" che consente di arrivare al suolo con buona precisione evitando di fare molte manovre vicino al terreno.',
			'Un tipo di avvicinamento molto complesso, costituito da molte fasi distinte e caratterizzato da manovre da farsi vicino al suolo.',
			'Un tipo di avvicinamento valido solo per gli aeromobili e quindi non adatto al deltaplano ed al parapendio.'
		],
		correct_answer_index: 0
	},
	{
		id: '7027',
		section: 'TECNICA DI PILOTAGGIO',
		text: "L'area di atterraggio è molto frequentata. Se le altre condizioni lo permettono scegliamo di atterrare:",
		answers: [
			'effettuando un circuito di avvicinamento ad "otto".',
			'effettuando un circuito di avvicinamento a "C".',
			'effettuando un avvicinamento diretto con delle "esse" in finale.'
		],
		correct_answer_index: 1
	},
	{
		id: '7028',
		section: 'TECNICA DI PILOTAGGIO',
		text: 'In un atterraggio in cui si presentano contemporaneamente molti deltaplani e parapendio, sarà opportuno:',
		answers: [
			'impostare gli avvicinamenti con la tecnica a "C" rispettando le precedenze ed avviandosi all\'atterraggio quando si è più in basso degli altri.',
			'impostare gli avvicinamenti con la tecnica a "otto" rispettando le precedenze ed avviandosi all\'atterraggio quando si è più in basso degli altri.',
			"impostare gli avvicinamenti con l'una o l'altra tecnica fatto salvo il rispetto delle precedenze."
		],
		correct_answer_index: 0
	},
	{
		id: '7029',
		section: 'TECNICA DI PILOTAGGIO',
		text: 'Quando è necessario tenere particolarmente conto del gradiente del vento?',
		answers: [
			'Volando in termica.',
			'In atterraggio o durante il volo in prossimità del pendio.',
			'In decollo perché la velocità del vento sicuramente diminuisce allontanandosi dal suolo.'
		],
		correct_answer_index: 1
	},
	{
		id: '7030',
		section: 'TECNICA DI PILOTAGGIO',
		text: 'Effettuando un avvicinamento con circuito a "C" in condizioni di vento sostenuto, è necessario iniziare la virata base:',
		answers: [
			'ben oltre il traverso del punto di contatto.',
			'non al di sopra dei 50 m di quota.',
			'non troppo oltre il traverso del punto di contatto.'
		],
		correct_answer_index: 2
	},
	{
		id: '7031',
		section: 'TECNICA DI PILOTAGGIO',
		text: 'Se, per errore, l\'asse prescelto dal pilota per effettuare una serie di "otto" in avvicinamento è troppo prossimo al punto di contatto, per non mancare l\'atterraggio il rischio è quello di dover:',
		answers: [
			'iniziare la virata in finale a quota molto alta.',
			'effettuare il tratto finale su una traiettoria molto ripida.',
			'effettuare la virata in finale a quota molto bassa.'
		],
		correct_answer_index: 2
	},
	{
		id: '7032',
		section: 'TECNICA DI PILOTAGGIO',
		text: "Durante la fase finale dell'atterraggio con vento forte in deltaplano o parapendio il pilota deve:",
		answers: [
			"attendersi una traiettoria ripida, aumentare la velocità all'aria al massimo per minimizzare l'effetto del gradiente del vento o del wind shear, raccordare moderatamente e solo in prossimità del suolo.",
			'cercare di assumere la traiettoria più ripida possibile mantenendo la velocità di minimo tasso di caduta, in previsione del gradiente di vento raccordare moderatamente e solo in prossimità del suolo.',
			"indipendentemente dalla traiettoria che ne risulta mantenere la minima velocità all'aria possibile e stallare non appena si incontrano condizioni di gradiente del vento."
		],
		correct_answer_index: 0
	},
	{
		id: '7033',
		section: 'TECNICA DI PILOTAGGIO',
		text: 'Per effetto del gradiente del vento vicino al suolo in atterraggio il pilota deve attendersi:',
		answers: [
			'un aumento improvviso del tasso di caduta con probabile picchiata del mezzo che è possibile prevenire con una buona dose di velocità.',
			"una improvvisa diminuzione di velocità al suolo per l'aumentata componente di vento contrario che non crea problemi di pilotaggio.",
			"una perdita improvvisa di quota che non si può compensare aumentando decisamente l'incidenza."
		],
		correct_answer_index: 0
	},
	{
		id: '7034',
		section: 'TECNICA DI PILOTAGGIO',
		text: 'Il mantenimento della massima velocità in finale prima di iniziare a raccordare è necessario per:',
		answers: [
			'poter stallare meglio in prossimità del suolo.',
			'evitare gli effetti negativi di eventuale gradiente del vento o wind shear.',
			'avvicinarsi al terreno con una traiettoria più ripida.'
		],
		correct_answer_index: 1
	},
	{
		id: '7035',
		section: 'TECNICA DI PILOTAGGIO',
		text: 'Il vento in atterraggio è sostenuto, volando in deltaplano o parapendio, per aumentare il margine di sorvolo di eventuali ostacoli lungo la traiettoria, al pilota conviene tra le seguenti soluzioni:',
		answers: [
			"aumentare la velocità all'aria perché solo così facendo si ottiene la massima efficienza suolo possibile e quindi la minor pendenza di traiettoria reale.",
			"diminuire la velocità all'aria onde ottenere il minimo tasso di caduta possibile.",
			'volare comunque al regime di massima efficienza in aria calma per ottenere la minor pendenza di traiettoria.'
		],
		correct_answer_index: 0
	},
	{
		id: '7036',
		section: 'TECNICA DI PILOTAGGIO',
		text: 'Quando è necessario controllare che i cordini del parapendio non siano attorcigliati o aggrovigliati?',
		answers: [
			"Dopo aver gonfiato, sollevato e frenato quanto basta l'ala in fase di decollo.",
			'Subito dopo essere atterrati prima di riporre il parapendio.',
			"Durante la preparazione dell'ala per il decollo."
		],
		correct_answer_index: 2
	},
	{
		id: '7037',
		section: 'TECNICA DI PILOTAGGIO',
		text: 'Durante un volo di cross non sempre è possibile atterrare dove previsto. Il pilota dovrebbe conoscere perfettamente:',
		answers: [
			'la tecnica per atterrare senza inconvenienti in un preciso punto di un pendio o una superficie ridotta.',
			'le tecniche di sopravvivenza in montagna per salvaguardarsi in attesa di recuperi.',
			'le tecniche per effettuare atterraggi con il vento anche forte in coda per poter atterrare comunque anche su piccole superfici circondate da eventuali ostacoli.'
		],
		correct_answer_index: 0
	},
	{
		id: '7038',
		section: 'TECNICA DI PILOTAGGIO',
		text: 'Immediatamente prima di effettuare un decollo in parapendio è necessario eseguire i controlli di sicurezza che sono:',
		answers: [
			'scarpe allacciate, selletta allacciata e regolata come previsto, bretelle e cordini correttamente predisposti ed impugnati, ala in posizione corretta, casco allacciato, vento e condizioni meteo favorevoli, spazio aereo libero.',
			"casco e guanti indossati, terreno sgombro ed adatto, cassoni dell'ala aperti, vento favorevole e spazio aereo libero.",
			"moschettoni o maillons serrati, integrità dell'ala verificata, selletta correttamente collegata all'ala, freni liberi."
		],
		correct_answer_index: 0
	},
	{
		id: '7039',
		section: 'TECNICA DI PILOTAGGIO',
		text: "Nel parapendio oltre a curare che la posizione del pilota risulti in volo quella corretta, è indispensabile, affinché l'ala mantenga le caratteristiche garantite dall'omologazione, verificare che il tipo di selletta usato sia compatibile e che vengano rispettate le seguenti disposizioni:",
		answers: [
			'regolare la selletta per ottenere che la distanza tra le bretelle (destra e sinistra) sia sempre superiore a 40 cm.',
			'regolare la selletta in modo che il pilota possa comunque arrivare ad afferrare i cordini anteriori esterni ben sopra i maillons.',
			'regolare la selletta in modo che la distanza tra le bretelle (destra e sinistra) nonché tra i maillons ed il piano della selletta sia quella prevista e riportata sulla targhetta di omologazione.'
		],
		correct_answer_index: 2
	},
	{
		id: '7040',
		section: 'TECNICA DI PILOTAGGIO',
		text: 'Se ci rendiamo conto che il nostro parapendio è umido, quali accorgimenti dobbiamo adottare durante il volo:',
		answers: [
			'effettuare le "orecchie" per scendere più velocemente.',
			'non ci sono particolari accorgimenti da adottare, perché la vela umida non presenta alcun problema di assetto.',
			"pilotare l'ala con dolcezza rimanendo nella fascia alta delle velocità."
		],
		correct_answer_index: 2
	},
	{
		id: '7051',
		section: 'TECNICA DI PILOTAGGIO',
		text: 'Il parapendio è un mezzo che presenta il vantaggio di poter girare abbastanza stretto da non uscire da una eventuale termica anche se di modeste dimensioni. Quali delle seguenti opzioni è preferibile per sfruttare meglio questo tipo di condizioni?',
		answers: [
			'Scegliere un ottimo compromesso tra inclinazione laterale e tasso di caduta che consenta comunque di non uscire dalla termica, tenendo conto del suo andamento verticale.',
			'Eseguire comunque virate più piatte possibile per ottenere il minimo tasso di caduta.',
			'Effettuare degli "otto" in modo tale da rimanere entro i limiti della termica stessa.'
		],
		correct_answer_index: 0
	},
	{
		id: '7052',
		section: 'TECNICA DI PILOTAGGIO',
		text: "E' possibile provare l'avvicinamento allo stallo in parapendio e con quale tecnica per garantirsi adeguati margini di sicurezza?",
		answers: [
			'Si, effettuandolo solo in quota indipendentemente dal modo in cui si interviene sui comandi.',
			'No, tutto ciò che ha a che vedere con lo stallo comunque non può essere effettuato mantenendo adeguati margini di sicurezza in quanto induce sicuramente configurazioni inusuali.',
			"Si, durante un corso SIV, seguiti da istruttore qualificato volando sull'acqua ed effettuandolo con azione dolce e progressiva sui comandi sino al limite dello stallo, provvedendo ad un immediato ricupero delle condizioni normali di volo prima che l'ala collassi bruscamente dietro al pilota."
		],
		correct_answer_index: 2
	},
	{
		id: '7053',
		section: 'TECNICA DI PILOTAGGIO',
		text: 'Come si riconosce uno stallo paracadutale del parapendio?',
		answers: [
			"Ala perfettamente gonfia, velocità all'aria praticamente nulla, tasso di caduta elevato.",
			"Ala perfettamente gonfia, velocità all'aria praticamente nulla, tasso di caduta normale, forti vibrazioni sui comandi.",
			"Ala con chiusura laterale, velocità all'aria praticamente nulla, tendenza dell'ala all'autorotazione."
		],
		correct_answer_index: 0
	},
	{
		id: '7054',
		section: 'TECNICA DI PILOTAGGIO',
		text: 'In volo con il parapendio può accadere che accidentalmente si raggiunga lo stallo volando troppo lenti. Per una corretta rimessa, il pilota dovrà:',
		answers: [
			"a stallo avvenuto rilasciare immediatamente e velocemente i comandi per poi trazionarli bruscamente durante l'abbattimento in avanti dell'ala.",
			"a stallo avvenuto mantenere i comandi affondati, attendere guardando verso l'alto il ritorno dell'ala sulla verticale, quindi rilasciare gradualmente e simmetricamente i comandi pronto ad intervenire per gestire il pendolamento in avanti.",
			'a stallo avvenuto rilasciare dolcemente i comandi, iniziando se possibile una virata per acquisire velocità.'
		],
		correct_answer_index: 1
	},
	{
		id: '7055',
		section: 'TECNICA DI PILOTAGGIO',
		text: 'Quali sono le manovre di discesa rapida in parapendio?',
		answers: [
			'Effettuare virate continue che consentono di aumentare il carico alare.',
			"Fare volare l'ala in condizioni di stallo.",
			'Le "orecchie", i "wing over" e la spirale picchiata.'
		],
		correct_answer_index: 2
	},
	{
		id: '7056',
		section: 'TECNICA DI PILOTAGGIO',
		text: 'Qual è il risultato di una simmetrica e leggera tensione esercitata sugli elevatori posteriori del parapendio?',
		answers: [
			'Aumento della velocità e diminuzione della portanza.',
			"Variazione dell'assetto, dell'incidenza, della velocità.",
			'Diminuzione della sola incidenza.'
		],
		correct_answer_index: 1
	},
	{
		id: '7057',
		section: 'TECNICA DI PILOTAGGIO',
		text: 'È possibile in parapendio pilotare facendo uso dei soli elevatori posteriori?',
		answers: ['Si.', 'Si, ma non è possibile variare la velocità sulla traiettoria.', 'No.'],
		correct_answer_index: 0
	},
	{
		id: '7058',
		section: 'TECNICA DI PILOTAGGIO',
		text: "Il pilota che agisce sull'acceleratore sa di poter:",
		answers: [
			"variare l'assetto, l'incidenza e la velocità dell'ala entro limiti ben precisi.",
			"variare quanto vuole la velocità dell'ala agendo su assetto ed incidenza.",
			'variare consistentemente la pendenza della traiettoria in quanto riesce a produrre ampie variazioni di incidenza.'
		],
		correct_answer_index: 0
	},
	{
		id: '7059',
		section: 'TECNICA DI PILOTAGGIO',
		text: 'In volo rettilineo in uscita da una virata, se per effetto di una sovracorrezione si innescano oscillazioni laterali del parapendio il pilota dovrà:',
		answers: [
			'cercare di smorzarle insistendo ad agire sui comandi in contro fase.',
			'rilasciare completamente i comandi per qualche secondo e poi iniziare una virata accentuata a destra o sinistra.',
			"rallentare trazionando con una certa decisione ed in modo simmetrico i comandi sino ad ottenere la stabilizzazione dell'ala."
		],
		correct_answer_index: 2
	},
	{
		id: '7060',
		section: 'TECNICA DI PILOTAGGIO',
		text: "La corretta sequenza in finale per l'atterraggio in parapendio, in condizioni di vento moderato, è:",
		answers: [
			"massima velocità all'aria sino a circa un metro dal suolo quindi intervento deciso sui comandi per provocare lo stallo.",
			"massima velocità all'aria possibile sino a circa 4 o 5 metri dal suolo, primo intervento sui comandi per diminuire velocità e pendenza (freni trazionati circa al 20%), graduale ma completa frenata in prossimità del suolo sino al contatto.",
			'regime di minimo tasso di caduta sino a circa due metri dal suolo quindi graduale intervento sui comandi sino a provocare lo stallo.'
		],
		correct_answer_index: 1
	},
	{
		id: '7061',
		section: 'TECNICA DI PILOTAGGIO',
		text: 'Nella zona di decollo abbiamo vento sufficiente a consentire un gonfiaggio fronte vela ma il vento è laterale (25 gradi) rispetto alla massima pendenza del terreno.',
		answers: [
			'Predisponiamo la vela per il gonfiaggio lungo la massima pendenza per sfruttarla al meglio.',
			'Orientiamo la vela contro vento per gonfiarla e successivamente eseguiamo la corsa di decollo lungo la massima pendenza.',
			'Orientiamo la vela contro vento per gonfiarla e successivamente decolliamo lungo questa direzione.'
		],
		correct_answer_index: 1
	},
	// {
	// 	id: '7062',
	// 	section: 'TECNICA DI PILOTAGGIO',
	// 	text: 'Decollo in deltaplano. Tra i controlli di sicurezza pre-decollo, uno in particolare risulta essenziale e deve essere eseguito con una tecnica ed una cura particolare perché ha causato svariati e gravi incidenti:',
	// 	answers: [
	// 		'il controllo del posizionamento del deltaplano.',
	// 		"il controllo dell'avvenuto aggancio del pilota al deltaplano.",
	// 		'il controllo del corretto ripiegamento del paracadute di emergenza.'
	// 	],
	// 	correct_answer_index: 1
	// },
	// {
	// 	id: '7063',
	// 	section: 'TECNICA DI PILOTAGGIO',
	// 	text: "Come è necessario verificare nel miglior modo l'avvenuto corretto aggancio del pilota al deltaplano?",
	// 	answers: [
	// 		"Facendo sorreggere la chiglia del deltaplano da un assistente, disponendosi in posizione orizzontale di volo sospesi all'aggancio, verificando oltre all'aggancio stesso la posizione del corpo rispetto alla barra.",
	// 		"Agganciando il moschettone e verificando attentamente con un controllo visivo che l'aggancio stesso sia correttamente avvenuto.",
	// 		"Facendo verificare dall'assistente che l'aggancio sia stato correttamente effettuato."
	// 	],
	// 	correct_answer_index: 0
	// },
	// {
	// 	id: '7064',
	// 	section: 'TECNICA DI PILOTAGGIO',
	// 	text: 'Quali precauzioni si devono adottare se si intende decollare in deltaplano con vento sostenuto?',
	// 	answers: [
	// 		"Durante la fase immediatamente precedente il decollo far tenere l'estremità alare da un solo assistente.",
	// 		"Accertarsi che durante il decollo nessuno degli assistenti trattenga l'ala.",
	// 		'Provvedere a che gli assistenti spingano adeguatamente la chiglia in fase di decollo.'
	// 	],
	// 	correct_answer_index: 1
	// },
	// {
	// 	id: '7065',
	// 	section: 'TECNICA DI PILOTAGGIO',
	// 	text: 'Se il vento è angolato entro i 45° rispetto alla direzione decollo, è possibile decollare in deltaplano e come?',
	// 	answers: [
	// 		'No, anche se la componente è moderata.',
	// 		'Si, se la componente è limitata, correndo lungo la linea di massima pendenza con la prua parzialmente orientata contro vento.',
	// 		'Si, anche se la componente è sostenuta, purché si corra contro vento.'
	// 	],
	// 	correct_answer_index: 1
	// },
	// {
	// 	id: '7066',
	// 	section: 'TECNICA DI PILOTAGGIO',
	// 	text: 'Se il pilota intraprende la corsa di decollo con il deltaplano molto cabrato:',
	// 	answers: [
	// 		'il decollo avviene prima ed è possibile sorvolare con più margine eventuali ostacoli sulla traiettoria.',
	// 		'il decollo avviene a velocità più bassa ed è più semplice il controllo del deltaplano dopo il decollo.',
	// 		'il decollo avviene con incidenza troppo elevata, la traiettoria che ne risulta è ripida ed è alto il rischio di stallo.'
	// 	],
	// 	correct_answer_index: 2
	// },
	// {
	// 	id: '7067',
	// 	section: 'TECNICA DI PILOTAGGIO',
	// 	text: "È possibile l'interruzione di decollo in deltaplano e quali rischi comporta eventualmente?",
	// 	answers: [
	// 		'Si, solo in caso di estrema necessità, con alta probabilità di danni alla struttura e conseguenze per il pilota.',
	// 		'Si, ogniqualvolta lo si ritenga necessario senza particolari problematiche se si conosce e si applica la tecnica corretta.',
	// 		'Si, purché non la si effettui quando si è prossimi allo stacco e si abbia una discreta esperienza.'
	// 	],
	// 	correct_answer_index: 0
	// },
	// {
	// 	id: '7068',
	// 	section: 'TECNICA DI PILOTAGGIO',
	// 	text: "Quando è opportuno che il pilota si sistemi nell'imbrago dopo il decollo in deltaplano?",
	// 	answers: [
	// 		'Il più presto possibile dopo lo stacco.',
	// 		'Acquisito il completo controllo della velocità e della direzione, lontano dal pendio.',
	// 		"Non esistono limitazioni o tecniche particolari per sistemarsi nell'imbrago."
	// 	],
	// 	correct_answer_index: 1
	// },
	// {
	// 	id: '7069',
	// 	section: 'TECNICA DI PILOTAGGIO',
	// 	text: "Come si può variare l'angolo d'incidenza in volo con il deltaplano?",
	// 	answers: [
	// 		'Solo agendo sul dispositivo chiamato "overdrive".',
	// 		'Appoggiando il peso del pilota sulla barra, indi spingendola o trazionandola.',
	// 		'Agendo sulla barra di controllo con movimenti di spinta o trazione.'
	// 	],
	// 	correct_answer_index: 2
	// },
	// {
	// 	id: '7070',
	// 	section: 'TECNICA DI PILOTAGGIO',
	// 	text: 'Individuare la corretta sequenza per effettuare una virata in deltaplano:',
	// 	answers: [
	// 		'presa di velocità, spostamento laterale del corpo rispetto alla barra parallelamente alla chiglia, spinta sulla barra per coordinare la virata, riposizionamento del corpo in posizione centrata rispetto alla barra.',
	// 		'presa di velocità, spostamento laterale del corpo rispetto alla barra parallelamente alla chiglia, riposizionamento del corpo in posizione centrata rispetto alla barra.',
	// 		"presa di velocità, spinta asimmetrica per ottenere una rotazione del deltaplano attorno all'asse verticale, contemporaneo spostamento laterale del corpo rispetto alla barra, riposizionamento del corpo in posizione centrata rispetto alla barra."
	// 	],
	// 	correct_answer_index: 0
	// },
	// {
	// 	id: '7071',
	// 	section: 'TECNICA DI PILOTAGGIO',
	// 	text: "Quale errore di manovra causa generalmente una scivolata d'ala del deltaplano?",
	// 	answers: [
	// 		"Mancata coordinazione dei movimenti durante l'esecuzione di una virata.",
	// 		"Mancata coordinazione dei movimenti ed insufficiente spinta sulla barra durante l'esecuzione di una virata.",
	// 		'Eccessiva spinta sulla barra durante una virata.'
	// 	],
	// 	correct_answer_index: 1
	// },
	// {
	// 	id: '7072',
	// 	section: 'TECNICA DI PILOTAGGIO',
	// 	text: 'Come si esegue il controllo di rollio in deltaplano?',
	// 	answers: [
	// 		"Facendo semplicemente ruotare l'asse del corpo rispetto alla barra.",
	// 		'Spostando lateralmente il corpo e facendo nello stesso tempo ruotare il suo asse rispetto alla barra.',
	// 		'Spostando lateralmente il corpo rispetto alla barra, sempre mantenendolo parallelo alla chiglia.'
	// 	],
	// 	correct_answer_index: 2
	// },
	// {
	// 	id: '7073',
	// 	section: 'TECNICA DI PILOTAGGIO',
	// 	text: 'Un ala rigida vira:',
	// 	answers: [
	// 		"grazie all'azione di comandi aerodinamici oltre ché allo spostamento del peso.",
	// 		"grazie all'azione dei comandi aerodinamici.",
	// 		'grazie allo spostamento del peso.'
	// 	],
	// 	correct_answer_index: 0
	// },
	// {
	// 	id: '7074',
	// 	section: 'TECNICA DI PILOTAGGIO',
	// 	text: 'A distanza di sicurezza dal terreno, come si esegue correttamente una prova di stallo in deltaplano?',
	// 	answers: [
	// 		"Si spinge dolcemente e gradualmente sulla barra per aumentare l'angolo di incidenza sino allo stallo ed a stallo avvenuto si ottiene la rimessa riaumentando la velocità al mezzo.",
	// 		"Si spinge in avanti sui montanti per ottenere angoli d'incidenza più elevati, e si mantiene questa posizione per almeno 30 secondi.",
	// 		"Dopo adeguata presa di velocità si spinge sulla barra con decisione e rapidità per ottenere un brusco aumento dell'incidenza."
	// 	],
	// 	correct_answer_index: 0
	// },
	// {
	// 	id: '7075',
	// 	section: 'TECNICA DI PILOTAGGIO',
	// 	text: 'Come deve comportarsi il pilota di deltaplano una volta entrato in termica se vuole sfruttarla?',
	// 	answers: [
	// 		'Mantenere il regime di minimo tasso di caduta ed effettuare delle virate di 360° per rimanere in termica.',
	// 		'Mantenere il regime di massima efficienza ed effettuare delle virate di 360° per rimanere in termica.',
	// 		'Mantenere sempre la minima velocità possibile ed effettuare delle virate accentuate di 360° per rimanere in termica.'
	// 	],
	// 	correct_answer_index: 0
	// },
	// {
	// 	id: '7076',
	// 	section: 'TECNICA DI PILOTAGGIO',
	// 	text: 'Cosa è il tumbling?',
	// 	answers: [
	// 		'È un manovra acrobatica.',
	// 		'È una manovra di discesa rapida.',
	// 		'È un rovesciamento in avanti del delta che si ha a seguito di fortissime turbolenze quali quelle dovute ai rotori.'
	// 	],
	// 	correct_answer_index: 2
	// },
	// {
	// 	id: '7077',
	// 	section: 'TECNICA DI PILOTAGGIO',
	// 	text: 'Come è possibile intervenire per aumentare la velocità di trim del deltaplano?',
	// 	answers: [
	// 		'Spostando indietro il punto di aggancio del pilota rispetto alla struttura.',
	// 		'Spostando in avanti il punto di aggancio del pilota rispetto alla struttura.',
	// 		'Spostando in alto il punto di aggancio del pilota rispetto alla struttura.'
	// 	],
	// 	correct_answer_index: 1
	// },
	// {
	// 	id: '7078',
	// 	section: 'TECNICA DI PILOTAGGIO',
	// 	text: "La corretta sequenza in finale per l'atterraggio con il deltaplano in condizioni di vento moderato è:",
	// 	answers: [
	// 		'raccordare adeguatamente in prossimità del suolo, mantenendo una traiettoria orizzontale sino al momento di "aprire" per stallare il deltaplano alla minima velocità di sostentamento possibile.',
	// 		'raccordare adeguatamente a 4 o 5 metri dal suolo, mantenendo poi una traiettoria lievemente picchiata sino al momento di "aprire" per stallare il deltaplano ad una velocità ancora ben superiore alla minima di sostentamento.',
	// 		'raccordare adeguatamente in prossimità del suolo, mantenendo una traiettoria orizzontale sino in prossimità del punto di contatto prestabilito quindi "aprire" con decisione per stallare il deltaplano, indipendentemente dalla velocità raggiunta.'
	// 	],
	// 	correct_answer_index: 0
	// },
	// {
	// 	id: '7079',
	// 	section: 'TECNICA DI PILOTAGGIO',
	// 	text: 'In quale momento ci si porta in posizione verticale per atterrare in deltaplano?',
	// 	answers: [
	// 		"Appena si avverte che il deltaplano risente dell'effetto suolo dopo aver raccordato in finale per l'atterraggio.",
	// 		'In finale per l\'atterraggio, durante la fase di raccordo in prossimità del suolo, prima di "aprire" per stallare il deltaplano.',
	// 		"Più tardi possibile durante l'apertura per stallare il deltaplano."
	// 	],
	// 	correct_answer_index: 1
	// },
	{
		id: '8001',
		section: 'MATERIALI',
		text: 'È più preoccupante un taglio sulla superficie del parapendio in corrispondenza:',
		answers: [
			"della parte anteriore centrale dell'estradosso.",
			"della parte posteriore laterale dell'estradosso.",
			"della parte posteriore laterale dell'intradosso."
		],
		correct_answer_index: 0
	},
	{
		id: '8002',
		section: 'MATERIALI',
		text: 'I cordini del parapendio devono essere di materiale:',
		answers: [
			'più elastico possibile.',
			'più anelastico e resistente possibile.',
			"più resistente possibile indipendentemente dall'elasticità."
		],
		correct_answer_index: 1
	},
	{
		id: '8003',
		section: 'MATERIALI',
		text: 'Durante il volo in parapendio sono sottoposti al maggior carico i cordini:',
		answers: ['anteriori.', 'posteriori.', 'laterali.'],
		correct_answer_index: 0
	},
	{
		id: '8004',
		section: 'MATERIALI',
		text: 'Il parapendio è generalmente fabbricato con materiale "rip-stop". Che cosa significa?',
		answers: [
			'Che il tessuto stesso non può strapparsi, ma solo tagliarsi.',
			'Che un eventuale taglio o strappo nel tessuto ha molte probabilità di estendersi pericolosamente.',
			'Che un eventuale taglio o strappo nel tessuto ha poche probabilità di estendersi pericolosamente.'
		],
		correct_answer_index: 2
	},
	{
		id: '8005',
		section: 'MATERIALI',
		text: 'Il tessuto con cui è generalmente costruito un parapendio deve essere:',
		answers: [
			"resistente all'usura, molto elastico e gas permeabile.",
			"resistente all'usura, anelastico e gas permeabile.",
			"resistente all'usura, anelastico e non gas permeabile."
		],
		correct_answer_index: 2
	},
	{
		id: '8006',
		section: 'MATERIALI',
		text: 'Quali agenti esterni danneggiano maggiormente il tessuto di un parapendio rendendolo fragile e gas-permeabile?',
		answers: [
			"I raggi ultravioletti e l'umidità.",
			"I raggi infrarossi e l'umidità.",
			'I raggi infrarossi ed il caldo secco.'
		],
		correct_answer_index: 0
	},
	{
		id: '8007',
		section: 'MATERIALI',
		text: 'Se il tessuto di un parapendio è divenuto poroso:',
		answers: [
			'risulta compromesso solo il suo aspetto.',
			'risultano un poco degradate solo le sue prestazioni.',
			'risultano degradate le sue prestazioni e compromessa la sua affidabilità.'
		],
		correct_answer_index: 2
	},
	{
		id: '8008',
		section: 'MATERIALI',
		text: 'Dovendo riporre un parapendio si avrà cura di farlo:',
		answers: [
			'solo se la vela è asciutta ed in luogo secco, lontano da fonti di calore ed al riparo dalla luce solare.',
			'solo se la vela è asciutta, in ambiente moderatamente umido e caldo, al riparo dalla luce solare.',
			"anche se è un poco umido, purché in luogo caldo, lasciando il sacco contenitore aperto onde consentire all'umidità di evaporare."
		],
		correct_answer_index: 0
	},
	{
		id: '8009',
		section: 'MATERIALI',
		text: "Il cordino di un parapendio è rimasto impigliato ed il kevlar che ne costituisce l'anima è ora privo di rivestimento, ma integro:",
		answers: [
			'provvisoriamente lo accorciamo annodandolo per evitare che la parte scoperta sia soggetta a trazione.',
			'provvisoriamente lo rivestiamo con nastro isolante onde evitare di esporre alla luce il tratto di kevlar scoperto.',
			'provvisoriamente aggiungiamo con opportuni nodi un altro pezzo di cordino al tratto scoperto per creare un rinforzo.'
		],
		correct_answer_index: 1
	},
	{
		id: '8010',
		section: 'MATERIALI',
		text: "Decidiamo di sostituire i maillons dell'imbrago con moschettoni. Avremo cura di:",
		answers: [
			'verificare che questi ultimi siano omologati e provvisti di ghiera a vite o a scatto.',
			'verificare che questi ultimi siano montati correttamente.',
			"usare moschettoni di tipo leggero per non appesantire l'imbrago stesso."
		],
		correct_answer_index: 0
	},
	// {
	// 	id: '8011',
	// 	section: 'MATERIALI',
	// 	text: 'Che cosa è necessario verificare in corrispondenza di piombature di cavi e tiranti del deltaplano?',
	// 	answers: [
	// 		'Che i cavi ed i tiranti non siano rotti sotto la piombatura.',
	// 		'Che le piombature siano semplicemente in buono stato.',
	// 		'Che le piombature siano in buono stato ed i cavi o tiranti non presentino segni di logoramento in vicinanza delle piombature stesse.'
	// 	],
	// 	correct_answer_index: 2
	// },
	// {
	// 	id: '8012',
	// 	section: 'MATERIALI',
	// 	text: 'Se ci accorgiamo che qualche tirante del deltaplano è sfilacciato o logoro:',
	// 	answers: [
	// 		'lo sostituiamo immediatamente prima di riandare in volo.',
	// 		'lo ripariamo alla meglio non potendolo sostituire immediatamente.',
	// 		'andiamo in volo facendo attenzione a non sollecitare la struttura con particolari manovre.'
	// 	],
	// 	correct_answer_index: 0
	// },
	// {
	// 	id: '8013',
	// 	section: 'MATERIALI',
	// 	text: "Durante l'ultimo volo in deltaplano abbiamo effettuato un atterraggio pesante. Il cross bar ed un montante si sono piegati:",
	// 	answers: [
	// 		'riandiamo in volo avendo sostituito il montante e raddrizzato perfettamente il cross bar.',
	// 		'riandiamo in volo solo dopo aver sostituito il montante ed il cross bar con ricambi originali.',
	// 		'riandiamo in volo avendo raddrizzato perfettamente montante e cross bar.'
	// 	],
	// 	correct_answer_index: 1
	// },
	// {
	// 	id: '8014',
	// 	section: 'MATERIALI',
	// 	text: 'Il materiale di cui sono rivestite le superfici di un deltaplano si deteriora particolarmente se esposto a lungo a:',
	// 	answers: ['raggi infrarossi.', 'raggi ultravioletti.', 'clima particolarmente secco.'],
	// 	correct_answer_index: 1
	// },
	// {
	// 	id: '8015',
	// 	section: 'MATERIALI',
	// 	text: 'Se si deve riporre il deltaplano per un lungo periodo dovremo aver cura di:',
	// 	answers: [
	// 		'farlo in apposita sacca quando siamo certi che è perfettamente asciutto, sistemandolo in luogo meno umido possibile, lontano dalla luce del sole e da fonti di calore.',
	// 		"sistemarlo in apposita sacca dopo aver effettuato l'ultimo volo, riporlo su appositi supporti fissati alle pareti di uno scantinato dove non può essere raggiunto dalla luce del sole.",
	// 		'lasciarlo ripiegato senza sacca, sistemandolo possibilmente in uno scantinato o in garage dove non può essere raggiunto dalla luce del sole, possibilmente su appositi supporti fissati alle pareti.'
	// 	],
	// 	correct_answer_index: 0
	// },
	// {
	// 	id: '8016',
	// 	section: 'MATERIALI',
	// 	text: 'Se in corrispondenza di qualche elemento costituente il corredo di tiranteria o bulloneria del deltaplano si riscontra presenza di ruggine:',
	// 	answers: [
	// 		'è necessario prima di volare rimuoverla prontamente usando appositi prodotti antiruggine sul particolare interessato.',
	// 		"è possibile comunque intraprendere il volo purché si sia accertata l'integrità del particolare interessato.",
	// 		'è indispensabile sostituire il particolare in questione con altro idoneo di identiche caratteristiche, prima di intraprendere qualsiasi tipo di volo.'
	// 	],
	// 	correct_answer_index: 2
	// },
	{
		id: '8017',
		section: 'MATERIALI',
		text: 'Quale norma deve essere rispettata nella manutenzione del paracadute di soccorso?',
		answers: [
			'Mai aprirlo perché si potrebbe commettere un errore nel ripiegarlo.',
			'Aprirlo alle scadenze previste o se bagnato e ripiegarlo sotto la supervisione di persone competenti.',
			'Aprirlo, farlo asciugare in luogo asciutto e ripiegarlo solo se siamo certi che sia bagnato o inumidito.'
		],
		correct_answer_index: 1
	},
	{
		id: '8018',
		section: 'MATERIALI',
		text: 'Riguardo al paracadute di soccorso è necessario accertare prima di ogni volo che:',
		answers: [
			"la maniglia di azionamento sia all'interno della sacca di lancio.",
			"non sia stato aperto anche solo per ispezione, in quanto la ripiegatura non eseguita dal costruttore non garantisce l'apertura.",
			'la fune di vincolo sia saldamente ancorata, la sacca correttamente posizionata, la maniglia di azionamento sia facilmente raggiungibile ed azionabile.'
		],
		correct_answer_index: 2
	},
	{
		id: '8019',
		section: 'MATERIALI',
		text: 'Per quale motivo un paracadute di soccorso che non sia stato sottoposto a periodica ispezione non garantisce sufficiente affidabilità?',
		answers: [
			'Perché il materiale con cui è fabbricato si deteriora rapidamente se non gli si fa prendere aria ogni tanto.',
			'Perché il materiale con cui è fabbricato può "incollarsi" per effetto del ripiegamento nella sacca, non garantendo una corretta e pronta apertura in caso di bisogno.',
			'Perché la fune di vincolo deve essere verificata ogni tanto in quanto può deteriorarsi con il rischio che si strappi in caso di utilizzo.'
		],
		correct_answer_index: 1
	},
	{
		id: '8020',
		section: 'MATERIALI',
		text: 'Il materiale e la tecnologia con cui sono fabbricati i paracadute di soccorso per il volo libero garantiscono totale sicurezza per aperture effettuate:',
		answers: [
			'a qualsiasi velocità di caduta.',
			'a velocità di caduta contenute entro certi limiti indicati dal costruttore.',
			'solo a velocità pari a quelle massime del deltaplano e del parapendio.'
		],
		correct_answer_index: 1
	},
	{
		id: '9001',
		section: 'SICUREZZA DEL VOLO',
		text: 'La sicurezza del volo in deltaplano e parapendio dipende moltissimo dal rapporto esistente tra esperienza del pilota e caratteristiche del mezzo utilizzato?',
		answers: ['Si.', 'Assolutamente no.', 'Si, ma solo se si tratta di volo in condizioni forti.'],
		correct_answer_index: 0
	},
	{
		id: '9002',
		section: 'SICUREZZA DEL VOLO',
		text: "La sicurezza del volo in deltaplano e parapendio dipende tra l'altro anche dal rapporto tra l'esperienza del pilota e le condizioni meteo affrontate?",
		answers: ['Assolutamente no.', 'Si.', 'Si, ma solo se si tratta di un volo di cross.'],
		correct_answer_index: 1
	},
	{
		id: '9003',
		section: 'SICUREZZA DEL VOLO',
		text: "Ci viene proposto l'acquisto di un'ala omologata alla quale sono state però apportate delle modifiche che ne migliorano le prestazioni. Qual è l'atteggiamento più conservativo da tenere sotto il profilo della sicurezza?",
		answers: [
			'Prendere in considerazione il mezzo ma solo dopo averlo personalmente provato al limite delle prestazioni.',
			'Acquistarlo solo se chi ce lo propone è persona esperta e fidata.',
			'Respingere la proposta orientando esclusivamente le proprie scelte su mezzi provvisti di omologazione ed assolutamente conformi al modello originale.'
		],
		correct_answer_index: 2
	},
	{
		id: '9004',
		section: 'SICUREZZA DEL VOLO',
		text: 'Quando va effettuata la revisione periodica dei mezzi?',
		answers: [
			'Quando si notano reazioni anomale o si sospettano variazioni nelle prestazioni del mezzo.',
			'Ad intervalli definiti dal costruttore perché le caratteristiche dei materiali subiscono variazioni anche solo per invecchiamento.',
			"Ad intervalli definiti dal costruttore se si vola assiduamente, riducendo la frequenza se si vola meno a patto di conservare l'attrezzatura con cura."
		],
		correct_answer_index: 1
	},
	{
		id: '9005',
		section: 'SICUREZZA DEL VOLO',
		text: 'Omettere o trascurare i controlli di sicurezza pre-volo:',
		answers: [
			"è senz'altro pericoloso.",
			'è tecnicamente scorretto.',
			"può non essere pericoloso se l'esperienza è molta."
		],
		correct_answer_index: 0
	},
	{
		id: '9006',
		section: 'SICUREZZA DEL VOLO',
		text: 'Se avete dei dubbi sulle condizioni meteo in rapporto alla vostra attrezzatura e/o esperienza, pur avendo sentito il parere di un pilota più esperto:',
		answers: [
			'è utile superare ogni indugio ed intraprendere il volo per migliorare le proprie capacità.',
			'è necessario sentire ancora il parere di almeno un altro pilota esperto prima di intraprendere il volo.',
			'è opportuno considerare i propri dubbi come valido e sufficiente motivo per non intraprendere assolutamente il volo.'
		],
		correct_answer_index: 2
	},
	{
		id: '9007',
		section: 'SICUREZZA DEL VOLO',
		text: "Per quale motivo un pilota di modesta esperienza non dovrebbe volare con un'ala ad alte prestazioni anche se giudicata facile e sicura da piloti più esperti?",
		answers: [
			'Perché le ali ad alte prestazioni sono comunque insicure anche se qualcuno non lo ammette.',
			"Perché la sicurezza del volo dipende molto dal rapporto esistente tra esperienza del pilota e prestazioni dell'ala, che deve necessariamente essere equilibrato.",
			'Perché comunque non riuscirebbe a sfruttarne le prestazioni, pur volando in sicurezza.'
		],
		correct_answer_index: 1
	},
	{
		id: '9008',
		section: 'SICUREZZA DEL VOLO',
		text: 'Vi trovate al decollo di un volo che non conoscete. Le condizioni sono forti, ma tutti decollano con successo. Tra i seguenti atteggiamenti che potete tenere quale ritenete sia più conservativo sotto il profilo della sicurezza?',
		answers: [
			'Attendere che le condizioni inizino a ridursi e solo allora intraprendere il volo tenendo presenti i consigli di chi vi è parso più equilibrato ed esperto.',
			'Predisporsi ad intraprendere il volo non prima di aver preso nota dei consigli forniti dagli esperti del luogo.',
			'Predisporsi ad intraprendere il volo imitando il piano di volo e le manovre degli esperti del luogo onde migliorare la propria personale esperienza.'
		],
		correct_answer_index: 0
	},
	{
		id: '9009',
		section: 'SICUREZZA DEL VOLO',
		text: 'Per quale motivo si ritiene pericoloso il decollo in discendenza o con vento in coda?',
		answers: [
			'Solo perché la pendenza della traiettoria di volo risulterà troppo elevata appena staccati da terra.',
			"Per l'eccessiva velocità che il pilota deve sviluppare correndo e per problemi di traiettoria una volta decollati.",
			'Per i problemi di autostabilità del mezzo che possono insorgere in tali condizioni.'
		],
		correct_answer_index: 1
	},
	{
		id: '9010',
		section: 'SICUREZZA DEL VOLO',
		text: 'Come deve essere valutato il decollo da un dirupo a scalino di circa 90° con deltaplano o parapendio?',
		answers: ['Molto pericoloso.', 'Molto tecnico.', 'Normale se si ha buona esperienza.'],
		correct_answer_index: 0
	},
	{
		id: '9011',
		section: 'SICUREZZA DEL VOLO',
		text: 'La giornata è umida e le termiche generano velocemente nubi cumuliformi. Entrati in termica, è necessario prestare attenzione al fatto che:',
		answers: [
			'si può scatenare un temporale e potremmo essere colpiti da un fulmine.',
			"l'ascendenza può essere associata a turbolenza che rende poco piacevole il volo.",
			"l'ascendenza può divenire tanto forte da impedirci di scendere, correndo così il grave rischio di essere trascinati in una nube a carattere temporalesco."
		],
		correct_answer_index: 2
	},
	{
		id: '9012',
		section: 'SICUREZZA DEL VOLO',
		text: 'Quale maggior pericolo si corre volando in nube?',
		answers: [
			'Avere una collisione con altri apparecchi.',
			"Subire un degrado delle prestazioni a causa di eventuali formazioni di ghiaccio sulla struttura dell'apparecchio.",
			"Perdere il senso dell'orientamento e il controllo dell'apparecchio, poiché gli organi dell'equilibrio funzionano male in mancanza di riferimenti visivi."
		],
		correct_answer_index: 2
	},
	{
		id: '9013',
		section: 'SICUREZZA DEL VOLO',
		text: "È dimostrato che il wind shear è un fenomeno pericoloso per il volo in generale, ma in particolare per il Volo Libero. Che cosa s'intende per wind shear?",
		answers: [
			"Solo un improvviso aumento dell'intensità del vento nel tempo e/o nello spazio.",
			"Un'improvvisa variazione di direzione e/o d'intensità del vento nel tempo e/o nello spazio.",
			"Un improvviso aumento dell'intensità del vento relativo sull'ala."
		],
		correct_answer_index: 1
	},
	{
		id: '9014',
		section: 'SICUREZZA DEL VOLO',
		text: "Rispetto al suolo non avanziamo. Siamo alla presenza di un vento meteorologico contrario la cui velocità è pari alla nostra velocità all'aria. Se di colpo il vento cessasse l'ala:",
		answers: [
			"risulterebbe, anche se per un tempo brevissimo, senz'altro investita da un vento relativo nullo.",
			"continuerebbe a volare alla velocità all'aria che aveva prima.",
			'non avrebbe comunque problemi di natura aerodinamica.'
		],
		correct_answer_index: 0
	},
	{
		id: '9015',
		section: 'SICUREZZA DEL VOLO',
		text: "Che cosa s'intende per configurazione inusuale di un deltaplano e di un parapendio?",
		answers: [
			"Una configurazione o una situazione di volo normale per l'ala ma alla quale il pilota non è abituato.",
			"Una configurazione dell'ala o una situazione di volo anomala e al di fuori del normale inviluppo di volo e di manovrabilità previsti.",
			"Una situazione di volo in cui i valori dell'incidenza sono ai limiti dello stallo."
		],
		correct_answer_index: 1
	},
	{
		id: '9016',
		section: 'SICUREZZA DEL VOLO',
		text: "Un'ala certificata offre le seguenti garanzie rispetto a un'ala non certificata:",
		answers: [
			"le reazioni dell'ala certificata sono sempre controllabili e non pericolose, quelle dell'ala non certificata sono pericolose.",
			"le reazioni dell'ala non certificata non sono note, quelle dell'ala certificata sono note (relativamente alle manovre di omologazione).",
			"un'ala certificata è adatta al pilota medio, le ali non certificate sono riservate ai competitori."
		],
		correct_answer_index: 1
	},
	{
		id: '9017',
		section: 'SICUREZZA DEL VOLO',
		text: 'Ai fini del volo con deltaplano e parapendio è necessario tenere presenti le difficoltà e i rischi connessi ad attività svolta in una valle lunga e stretta perché:',
		answers: [
			'è sempre interessata da forti correnti discensionali.',
			'in essa eventuali brezze o venti sono comunque violente e turbolente particolarmente in corrispondenza del fondo valle.',
			"il fondo di una valle stretta non presenta generalmente aree idonee all'atterraggio a prescindere dal vento esistente."
		],
		correct_answer_index: 1
	},
	{
		id: '9018',
		section: 'SICUREZZA DEL VOLO',
		text: 'Se deltaplano e parapendio sono particolarmente soggetti agli effetti negativi del wind shear, come può essere giudicato un atterraggio effettuato sottovento a ostacoli rilevanti in condizione di vento sostenuto?',
		answers: [
			'Fattibile, ma con qualche difficoltà da piloti con poca esperienza.',
			'Molto tecnico e quindi fattibile in sicurezza totale solo da piloti esperti.',
			"Pericoloso in assoluto per qualsiasi pilota per l'imprevedibilità dei fenomeni aerologici associati a questa situazione."
		],
		correct_answer_index: 2
	},
	{
		id: '9019',
		section: 'SICUREZZA DEL VOLO',
		text: 'Se in atterraggio il vento è tanto forte da limitare notevolmente la penetrazione, quali soluzioni adottare in avvicinamento?',
		answers: [
			'Effettuare degli "otto" con la tecnica a "granchio" che ci dota comunque di una certa velocità al suolo permettendoci di affrontare in sicurezza situazioni di forte gradiente in prossimità del terreno.',
			'Eseguire comunque un circuito a "C" che elimina la necessità di fare molte virate, senza quindi doverci porre il problema dell\'avanzamento rispetto al terreno.',
			'Tentare un avvicinamento a "otto" normale atterrando all\'indietro o su una traiettoria verticale se questo è ciò che si ottiene.'
		],
		correct_answer_index: 0
	},
	{
		id: '9020',
		section: 'SICUREZZA DEL VOLO',
		text: 'Il vento è aumentato tanto da impedirci di atterrare normalmente. Ci vediamo costretti a farlo in un bosco. Quale tecnica è bene adottare?',
		answers: [
			"Atterrare controvento sulla chioma degli alberi, proteggersi il busto e il capo con braccia e mani nella successiva caduta, appena arrestata quest'ultima afferrare saldamente il ramo più vicino.",
			"Atterrare controvento scegliendo di farlo in prossimità del suolo quanto possibile e nello spazio compreso tra due tronchi d'albero, iniziare a raccordare solo all'ultimo momento.",
			"Spiralare sopra un'eventuale radura sino in prossimità del suolo, cercando di atterrare nel suo interno indipendentemente dalla direzione del vento anche a costo di assumere alti angoli di rollio in prossimità del suolo."
		],
		correct_answer_index: 0
	},
	{
		id: '9021',
		section: 'SICUREZZA DEL VOLO',
		text: 'Vedendoci costretti a un atterraggio in acqua, quale precauzione è indispensabile adottare?',
		answers: [
			"Solo dopo il contatto con l'acqua sganciarsi e/o fuoriuscire dall'imbrago.",
			"Poco prima dell'impatto predisporre quanto possibile l'imbrago onde ci si possa liberare da esso al più presto a impatto avvenuto.",
			'Atterrare in direzione parallela al moto ondoso.'
		],
		correct_answer_index: 1
	},
	{
		id: '9022',
		section: 'SICUREZZA DEL VOLO',
		text: 'Per quale motivo il pilotaggio in prossimità del suolo deve necessariamente essere più dolce e attento?',
		answers: [
			'Perché il recupero da configurazioni inusuali in cui ci si venga a trovare intenzionalmente o meno, comporta una perdita di quota che può essere fatale.',
			"Perché vicino al suolo le reazioni dell'ala ai comandi sono più brusche a causa della maggior densità dell'aria.",
			"Perché l'effetto suolo si fa sentire alterando l'autostabilità del mezzo."
		],
		correct_answer_index: 0
	},
	{
		id: '9023',
		section: 'SICUREZZA DEL VOLO',
		text: 'Quali conseguenze in volo si possono avere per non aver agganciato i cosciali della selletta del parapendio?',
		answers: [
			'Una posizione molto scomoda, ma il rischio è minimo se il pettorale è ben agganciato.',
			'Una situazione di gravissimo pericolo quale la fuoriuscita dalla selletta e la caduta.',
			'Una situazione di grave pericolo sempre che non ci si riesca ad aggrappare saldamente al fascio funicolare.'
		],
		correct_answer_index: 1
	},
	{
		id: '9024',
		section: 'SICUREZZA DEL VOLO',
		text: "Se durante il decollo in parapendio si constata che l'ala non si è gonfiata correttamente è preferibile per motivi di sicurezza:",
		answers: [
			'accelerare la corsa agendo sui comandi per ottenere il corretto gonfiaggio prima dello stacco.',
			'agire sui freni e interrompere il decollo, tenendo presente che il parapendio offre il vantaggio di una possibile interruzione di decollo senza conseguenze.',
			"proseguire nella manovra di decollo e dopo che esso è avvenuto ripristinare per prima cosa con l'uso dei comandi la configurazione normale dell'ala."
		],
		correct_answer_index: 1
	},
	{
		id: '9025',
		section: 'SICUREZZA DEL VOLO',
		text: 'Analizzare in anticipo previsioni meteorologiche specifiche per il volo aumenta la sicurezza?',
		answers: [
			'No perché la situazione meteorologica locale può essere valutata solo al momento.',
			'Si, perché una previsione positiva garantisce un volo sicuro.',
			'Si, perché fornisce informazioni utili a valutare meglio la situazione meteorologica e la sua possibile evoluzione.'
		],
		correct_answer_index: 2
	},
	{
		id: '9026',
		section: 'SICUREZZA DEL VOLO',
		text: "Se si va in volo con una \"cravatta\", per non esserci accorti durante i controlli che uno o più cordini erano disposti sotto l'estradosso con l'ala stesa al suolo e per non aver controllato l'ala accuratamente dopo il gonfiaggio, che cosa dobbiamo attenderci?",
		answers: [
			'Nulla di significativo a parte un modesto degrado delle prestazioni.',
			"Una tendenza alla rotazione dell'ala che però è sempre possibile compensare con peso e freno.",
			"Una situazione di grave pericolo che va dal ritorno violento al pendio all'impossibilità di recupero della cravatta con buone probabilità che l'ala sia difficilmente controllabile."
		],
		correct_answer_index: 2
	},
	{
		id: '9027',
		section: 'SICUREZZA DEL VOLO',
		text: 'Se durante un volo in parapendio si rompe il cordino di un freno, si è in una situazione di emergenza. Come ci si deve comportare?',
		answers: [
			'Pilotare con entrambi gli elevatori posteriori trazionandoli con dolcezza e limitatamente allo stretto indispensabile per arrivare in atterraggio.',
			'Pilotare solo con il freno restante e manovrando meno possibile atterrare immediatamente sul pendio.',
			"Pilotare con l'elevatore posteriore dalla parte del freno inefficiente e con il freno efficiente dall'altra."
		],
		correct_answer_index: 0
	},
	{
		id: '9028',
		section: 'SICUREZZA DEL VOLO',
		text: "E' vero che la certificazione europea del parapendio garantisce, entro certi limiti, un ottimo livello di sicurezza a patto che siano rispettati il rapporto tra esperienza del pilota e classe di appartenenza dell'ala volata, nonché tutte le norme relative al tipo ed alla regolazione della selletta riportate nella certificazione?",
		answers: [
			"No, è un'affermazione poco attendibile.",
			'Si, ma è vero solo per ali standard.',
			'Si, è vero.'
		],
		correct_answer_index: 2
	},
	{
		id: '9029',
		section: 'SICUREZZA DEL VOLO',
		text: "E' corretto affermare dal punto di vista della sicurezza del volo che un'ala certificata in una classe basica garantisce il pilota anche se inesperto in caso di configurazione inusuale?",
		answers: [
			'Si, indipendentemente da altri fattori.',
			'Assolutamente no.',
			'Si, ma solo se sono state rispettate le norme relative al tipo e alla regolazione della selletta riportate nella certificazione.'
		],
		correct_answer_index: 2
	},
	{
		id: '9030',
		section: 'SICUREZZA DEL VOLO',
		text: "Ai fini della sicurezza del volo, un pilota che si appresta a volare un'ala certificata in una classe non basica deve essere conscio che in caso di configurazione inusuale:",
		answers: [
			'necessita il suo intervento tempestivo e qualificato per tornare a condizioni di normalità senza finire in una grave sequenza di configurazioni inusuali.',
			'può attendersi il ritorno a condizioni di normalità anche se non in 4 secondi.',
			'necessita il suo intervento sui comandi, che deve essere quello istintivo per ogni situazione.'
		],
		correct_answer_index: 0
	},
	{
		id: '9031',
		section: 'SICUREZZA DEL VOLO',
		text: "Configurazioni inusuali del parapendio. Chiusura asimmetrica spontanea, tendenza dell'ala all'autorotazione. Il pilota dovrà in ogni caso prima ristabilire il controllo direzionale dell'ala e solo dopo averlo ristabilito intervenire con il freno dalla parte della chiusura per riaprire l'ala:",
		answers: [
			"errato. E' fondamentale la riapertura dell'ala che quindi va fatta prima.",
			"corretto. Usando per ristabilire il controllo direzionale prima il peso e poi il freno per evitare lo stallo dovuto all'aumento del carico alare prodotto dalla chiusura.",
			"errato. E' opportuno cercare prima di riaprire l'ala e se ciò non fosse possibile usare subito il paracadute di soccorso."
		],
		correct_answer_index: 1
	},
	{
		id: '9032',
		section: 'SICUREZZA DEL VOLO',
		text: "Configurazioni inusuali del parapendio. Chiusura frontale del bordo d'attacco, tendenza dell'ala a passare bruscamente dietro al pilota. Il pilota dovrà prima di tutto rilasciare entrambi i freni per poi tenersi pronto a controllare l'abbattimento in avanti dell'ala:",
		answers: [
			"corretto, la riapertura dell'ala se si agisce rilasciando simmetricamente i freni generalmente non è problematica, ma lo possono essere i pendolamenti che ne conseguono.",
			"corretto, anche se i pendolamenti che conseguono alla riapertura dell'ala non costituiscono mai un problema.",
			"errato, è necessario comunque attendere che l'ala si riapra da sola per evitare inutili pendolamenti e se ciò non avviene usare al più presto il paracadute di soccorso."
		],
		correct_answer_index: 0
	},
	{
		id: '9033',
		section: 'SICUREZZA DEL VOLO',
		text: "Configurazioni inusuali del parapendio. La conseguenza di un'eccessiva trazione asimmetrica dei comandi dei freni è lo stallo asimmetrico che induce una brusca e violenta rotazione dell'ala attorno all'asse verticale, detta \"vite piatta negativa\". Per prevenire tale configurazione prima che si verifichi il pilota dovrà:",
		answers: [
			"affondare anche l'altro comando per poi rilasciarli entrambi verso l'alto dolcemente.",
			"rilasciare anche di poco il comando troppo affondato abbassando della stessa entità anche l'altro.",
			"rilasciare prontamente e simmetricamente verso l'alto entrambi i comandi, pronti a intervenire per controllare l'abbattimento dell'ala in avanti se e quando si verifica."
		],
		correct_answer_index: 2
	},
	{
		id: '9034',
		section: 'SICUREZZA DEL VOLO',
		text: 'Configurazioni inusuali del parapendio. In che cosa consiste il post-stallo di un parapendio e che cosa può accadere se si verifica?',
		answers: [
			'È la situazione prodotta dal permanere in condizioni di stallo, ma non può avere alcuna conseguenza se si verifica.',
			"È la condizione in cui si trova l'ala dopo una corretta rimessa dallo stallo; le conseguenze dipendono da come la rimessa si verifica.",
			"È la situazione prodotta dal permanere in condizioni di stallo e il conseguente collasso totale dell'ala."
		],
		correct_answer_index: 2
	},
	{
		id: '9035',
		section: 'SICUREZZA DEL VOLO',
		text: 'Configurazioni inusuali del parapendio. All\'uscita da uno stallo di "B" si constata di avere un tasso di caduta elevatissimo, una velocità di avanzamento quasi nulla con l\'ala perfettamente gonfia sulla verticale. Che cosa può essere accaduto?',
		answers: [
			'Si è finiti in stallo paracadutale per aver probabilmente rilasciato le bretelle "B" troppo lentamente verso l\'alto e/o perché si sta volando un\'ala dal tessuto divenuto poroso.',
			'Si è finiti in stallo paracadutale per aver rilasciato troppo bruscamente le bretelle "B" all\'uscita dalla manovra; la porosità dell\'ala non ha nulla a che vedere con questa situazione.',
			'Nulla di significativo, il tasso di caduta elevato è normale all\'uscita dallo stallo di "B" e per fortuna l\'ala è gonfia sulla verticale.'
		],
		correct_answer_index: 0
	},
	{
		id: '9036',
		section: 'SICUREZZA DEL VOLO',
		text: "Configurazioni inusuali del parapendio. Per ottenere al meglio l'uscita da uno stallo paracadutale il pilota dovrà, dopo aver rilasciato prontamente verso l'alto entrambi i freni, agire nell'ordine come segue:",
		answers: [
			'trazionare con decisione una sola delle bretelle anteriori oppure, se ciò non ha effetto, trazionare decisamente uno solo dei freni.',
			"spingere in avanti le bretelle A, utilizzare a fondo l'acceleratore, successivamente se l'assetto persiste affondare i freni simmetricamente e poi rilasciarli, utilizzare in ultima analisi un freno solo affondandolo e rilasciandolo e aspettandosi di uscire in quest'ultimo caso con una violenta virata o in \"vite piatta negativa\".",
			'affondare con decisione un freno solo, pompare simmetricamente con i freni, spingere in ultima analisi con decisione in avanti le bretelle anteriori.'
		],
		correct_answer_index: 1
	},
	{
		id: '9037',
		section: 'SICUREZZA DEL VOLO',
		text: "Decollo in deltaplano con vento sostenuto. L'utilizzo di un assistente che tocchi il delta all'inizio della rincorsa è rischioso perché:",
		answers: [
			"l'assistente può essere trascinato giù dalla rampa o addirittura essere portato in volo.",
			'non tutti gli assistenti danno adeguate garanzie di comportamento anche se ben istruiti dal pilota.',
			"l'assistente, anche se esperto non può avere la sensibilità rispetto al mezzo che invece ha il pilota e quindi può imprimergli un assetto e una posizione non ottimali."
		],
		correct_answer_index: 2
	},
	// {
	// 	id: '9038',
	// 	section: 'SICUREZZA DEL VOLO',
	// 	text: 'Il mancato o non corretto aggancio del pilota al deltaplano comporta:',
	// 	answers: [
	// 		'gravissime conseguenze sempre.',
	// 		'la necessità di atterrare al più presto.',
	// 		'la necessità di ridurre le manovre allo stretto indispensabile per non precipitare.'
	// 	],
	// 	correct_answer_index: 0
	// },
	// {
	// 	id: '9039',
	// 	section: 'SICUREZZA DEL VOLO',
	// 	text: 'Se per avaria strutturale il dispositivo antidrappo non dovesse entrare in funzione quando necessario, una volta innescata la caduta a drappo:',
	// 	answers: [
	// 		"è bene cercare prima di uscirne con l'uso dei comandi e del peso, non c'è fretta per l'uso del paracadute di soccorso.",
	// 		'è bene fare uso immediato del paracadute di soccorso, prima che la velocità verticale sia troppo elevata.',
	// 		"è bene attendere che la velocità di caduta sia molto elevata prima di aprire il paracadute di soccorso, al fine di ottenerne l'immediata apertura."
	// 	],
	// 	correct_answer_index: 1
	// },
	// {
	// 	id: '9040',
	// 	section: 'SICUREZZA DEL VOLO',
	// 	text: 'Le sollecitazioni che rendono pericoloso il looping eseguito con il deltaplano sono indotte:',
	// 	answers: [
	// 		'solo dalla velocità che è necessaria assumere prima di iniziare la manovra di cabrata.',
	// 		'solo dalle accelerazioni cui è sottoposto il mezzo durante tutta la manovra.',
	// 		'dalla velocità elevata che è necessario assumere prima di iniziare la manovVra di cabrata e dalle accelerazioni cui è sottoposto il deltaplano durante tutta la manovra.'
	// 	],
	// 	correct_answer_index: 2
	// },
	// {
	// 	id: '9041',
	// 	section: 'SICUREZZA DEL VOLO',
	// 	text: "Che cosa s'intende per tumbling del deltaplano?",
	// 	answers: [
	// 		"Una brusca rotazione incontrollata attorno all'asse d'imbardata.",
	// 		"Una brusca rotazione incontrollata attorno all'asse trasversale.",
	// 		"Una brusca rotazione incontrollata attorno all'asse longitudinale."
	// 	],
	// 	correct_answer_index: 1
	// },
	// {
	// 	id: '9042',
	// 	section: 'SICUREZZA DEL VOLO',
	// 	text: 'Quali elementi, tra i seguenti, contribuiscono a provocare il tumbling del deltaplano?',
	// 	answers: [
	// 		"Un angolo d'incidenza troppo elevato associato a condizioni di turbolenza.",
	// 		'Una velocità troppo elevata in condizioni di forte turbolenza.',
	// 		'Virate in condizioni di ascendenza.'
	// 	],
	// 	correct_answer_index: 0
	// },
	{
		id: '9043',
		section: 'SICUREZZA DEL VOLO',
		text: "E' vero che praticando il Volo Libero il pilota deve usare il paracadute di soccorso solo in ultima analisi e cioè quando non è possibile ripristinare altrimenti condizioni di volo nelle quali il mezzo risulti pilotabile sino a un atterraggio sicuro?",
		answers: [
			"No, questa è una credenza sbagliata perché il paracadute di soccorso va usato sempre e al più presto possibile quando l'ala assume una configurazione inusuale.",
			"Si, tenendo presente che non c'è alcuna fretta nell'utilizzarlo perché non ha limiti per l'apertura.",
			'Si, tenendo presente comunque che dal momento in cui si decide di usarlo è bene farlo al più presto per consentirgli di aprirsi in tempo utile ed entro i suoi limiti strutturali.'
		],
		correct_answer_index: 2
	},
	{
		id: '9044',
		section: 'SICUREZZA DEL VOLO',
		text: "Oltre al caso di malore del pilota, in quale di queste situazioni è utile l'apertura del paracadute di emergenza e come deve essere fatta?",
		answers: [
			"In forte turbolenza qualora risulti difficile il controllo del deltaplano o del parapendio, tirando con decisione la maniglia verso l'alto.",
			"In caso ci si trovi all'interno di una corrente ascensionale tanto forte da trascinarci in nube, tirando la maniglia con decisione verso il basso in modo che il paracadute si allontani più possibile dall'ala.",
			"In caso di rottura strutturale non potendo più controllare l'apparecchio o a seguito di configurazione inusuale che si riveli totalmente irrecuperabile con l'uso dei comandi e del peso, tirando con decisione la maniglia in modo che il paracadute si allontani più possibile dall'ala."
		],
		correct_answer_index: 2
	},
	{
		id: '9045',
		section: 'SICUREZZA DEL VOLO',
		text: "Se è vero che il paracadute di soccorso, come emerge inconfutabilmente da dati statistici, funziona nella quasi totalità dei casi, per quale motivo è comunque raccomandato il suo uso solo in casi in cui esso costituisce l'ultima risorsa disponibile?",
		answers: [
			'Perché le statistiche non sono attendibili, e il suo funzionamento è aleatorio.',
			"Perché pur garantendo un'altissima probabilità di funzionamento non è, nella quasi totalità dei casi, direzionabile e quindi non ci garantisce la scelta del punto di atterraggio.",
			'Perché è quasi sempre inutile usarlo anche se funziona, qualsiasi sia la configurazione inusuale assunta è infatti sempre possibile uscirne in tempo utile mantenendo la calma e insistendo sui comandi.'
		],
		correct_answer_index: 1
	}
];
