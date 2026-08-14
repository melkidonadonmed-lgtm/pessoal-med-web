/**
 * Calculadora Médica Pediátrica & Prescrição Clínica Pro v2.0
 * Suporte a dosagens por peso, limites de teto máximo, conversão de mg em gotas,
 * Holliday-Segar, Protocolo Dengue (MS), Solitações de Exames e Atestados CFM.
 * Matriz Completa de Medicações (SBP / Ministério da Saúde).
 */

document.addEventListener('DOMContentLoaded', () => {
    // -------------------------------------------------------------------------
    // BASE DE DADOS COMPLETA E ATUALIZADA DE MEDICAMENTOS PEDIÁTRICOS
    // -------------------------------------------------------------------------
    const medicamentos = [
        // =====================================================================
        // 1. SINTOMÁTICOS E ANTIEMÉTICOS
        // =====================================================================
        {
            id: 'paracetamol_gotas',
            categoria: 'sintomaticos',
            categoriaNome: '1. Sintomáticos e Antieméticos',
            nome: 'Paracetamol Gotas',
            apresentacao: '200 mg/mL (1 mL = 20 gotas | 1 gota = 10 mg)',
            posologiaStd: '10 a 15 mg/kg/dose (4/4h ou 6/6h) | Prática: 1 gota/kg/dose',
            doseMgKg: 15,
            concentracaoMgMl: 200,
            gotasPorMl: 20,
            tetoDoseMg: 1000,
            tetoDiaMg: 4000,
            frequencia: 'de 6 em 6 horas se febre (T >= 37.8°C) ou dor',
            unidadeDosagem: 'gotas',
            keywords: 'paracetamol tylenol gotas febre dor analgesico antipiretico',
            doseAdulta: { doseMg: 750, vol: '35 a 50 gotas (500 a 750 mg) de 6/6h — máx. 4 g/dia' }
        },
        {
            id: 'paracetamol_susp',
            categoria: 'sintomaticos',
            categoriaNome: '1. Sintomáticos e Antieméticos',
            nome: 'Paracetamol Suspensão Oral',
            apresentacao: '32 mg/mL (160 mg / 5 mL)',
            posologiaStd: '10 a 15 mg/kg/dose (6/6h se febre/dor)',
            doseMgKg: 15,
            concentracaoMgMl: 32,
            tetoDoseMg: 1000,
            tetoDiaMg: 4000,
            frequencia: 'de 6 em 6 horas se febre ou dor',
            unidadeDosagem: 'mL',
            keywords: 'paracetamol tylenol suspensao febre dor analgesico antipiretico',
            doseAdulta: { doseMg: 750, vol: '16 a 24 mL (500 a 750 mg) de 6/6h — máx. 4 g/dia' }
        },
        {
            id: 'ibuprofeno_gotas_50',
            categoria: 'sintomaticos',
            categoriaNome: '1. Sintomáticos e Antieméticos',
            nome: 'Ibuprofeno Gotas 50 mg/mL',
            apresentacao: '50 mg/mL (1 mL = 20 gotas | 1 gota = 2,5 mg)',
            posologiaStd: '5 a 10 mg/kg/dose (6/6h ou 8/8h) | Prática: 2 gotas/kg p/ 5 mg/kg',
            doseMgKg: 10,
            concentracaoMgMl: 50,
            gotasPorMl: 20,
            tetoDoseMg: 400,
            tetoDiaMg: 2400,
            frequencia: 'de 8 em 8 horas se febre ou dor',
            unidadeDosagem: 'gotas',
            keywords: 'ibuprofeno advil alivium gotas febre dor anti-inflatorio',
            doseAdulta: { doseMg: 600, vol: '600 mg VO 6/8h após refeições (preferir comprimido 300/600 mg)' }
        },
        {
            id: 'ibuprofeno_gotas_100',
            categoria: 'sintomaticos',
            categoriaNome: '1. Sintomáticos e Antieméticos',
            nome: 'Ibuprofeno Gotas 100 mg/mL',
            apresentacao: '100 mg/mL (1 mL = 20 gotas | 1 gota = 5 mg)',
            posologiaStd: '5 a 10 mg/kg/dose (6/6h ou 8/8h) | Prática: 1 gota/kg p/ 5 mg/kg',
            doseMgKg: 10,
            concentracaoMgMl: 100,
            gotasPorMl: 20,
            tetoDoseMg: 400,
            tetoDiaMg: 2400,
            frequencia: 'de 8 em 8 horas se febre ou dor',
            unidadeDosagem: 'gotas',
            keywords: 'ibuprofeno advil alivium gotas febre dor concentrado',
            doseAdulta: { doseMg: 600, vol: '600 mg VO 6/8h após refeições (preferir comprimido 300/600 mg)' }
        },
        {
            id: 'ibuprofeno_susp_30',
            categoria: 'sintomaticos',
            categoriaNome: '1. Sintomáticos e Antieméticos',
            nome: 'Ibuprofeno Suspensão 30 mg/mL',
            apresentacao: '30 mg/mL (100 mg / 5 mL ~ 20 mg/mL sol. oral)',
            posologiaStd: '5 a 10 mg/kg/dose (6/6h ou 8/8h)',
            doseMgKg: 10,
            concentracaoMgMl: 30,
            tetoDoseMg: 400,
            tetoDiaMg: 2400,
            frequencia: 'de 8 em 8 horas se febre ou dor',
            unidadeDosagem: 'mL',
            keywords: 'ibuprofeno suspensao febre dor anti-inflatorio',
            doseAdulta: { doseMg: 600, vol: '600 mg VO 6/8h após refeições (preferir comprimido 300/600 mg)' }
        },
        {
            id: 'ibuprofeno_susp_50',
            categoria: 'sintomaticos',
            categoriaNome: '1. Sintomáticos e Antieméticos',
            nome: 'Ibuprofeno Suspensão 50 mg/mL',
            apresentacao: '50 mg/mL (200 mg / 5 mL)',
            posologiaStd: '5 a 10 mg/kg/dose (6/6h ou 8/8h)',
            doseMgKg: 10,
            concentracaoMgMl: 50,
            tetoDoseMg: 400,
            tetoDiaMg: 2400,
            frequencia: 'de 8 em 8 horas se febre ou dor',
            unidadeDosagem: 'mL',
            keywords: 'ibuprofeno suspensao forte 200mg febre dor',
            doseAdulta: { doseMg: 600, vol: '600 mg VO 6/8h após refeições (preferir comprimido 300/600 mg)' }
        },
        {
            id: 'dipirona_gotas',
            categoria: 'sintomaticos',
            categoriaNome: '1. Sintomáticos e Antieméticos',
            nome: 'Dipirona Gotas 500 mg/mL',
            apresentacao: '500 mg/mL (1 mL = 20 gotas | 1 gota = 25 mg)',
            posologiaStd: '10 a 25 mg/kg/dose (6/6h) | Prática: 1 gota para cada 1 a 2 kg',
            doseMgKg: 15,
            concentracaoMgMl: 500,
            gotasPorMl: 20,
            tetoDoseMg: 1000,
            tetoDiaMg: 4000,
            frequencia: 'de 6 em 6 horas se febre (T >= 37.8°C) ou dor',
            unidadeDosagem: 'gotas',
            keywords: 'dipirona novalgina gotas febre dor antipiretico analgesico',
            doseAdulta: { doseMg: 1000, vol: '20 a 40 gotas (500 a 1.000 mg) de 6/6h — máx. 4 g/dia' }
        },
        {
            id: 'dipirona_sol_oral',
            categoria: 'sintomaticos',
            categoriaNome: '1. Sintomáticos e Antieméticos',
            nome: 'Dipirona Solução Oral 50 mg/mL',
            apresentacao: '50 mg/mL (250 mg / 5 mL)',
            posologiaStd: '10 a 25 mg/kg/dose (6/6h ou 8/8h)',
            doseMgKg: 15,
            concentracaoMgMl: 50,
            tetoDoseMg: 1000,
            tetoDiaMg: 4000,
            frequencia: 'de 6 em 6 horas se febre ou dor',
            unidadeDosagem: 'mL',
            keywords: 'dipirona novalgina xarope solucao oral febre dor',
            doseAdulta: { doseMg: 1000, vol: '10 a 20 mL (500 a 1.000 mg) de 6/6h — máx. 4 g/dia' }
        },
        {
            id: 'dipirona_ampola',
            categoria: 'sintomaticos',
            categoriaNome: '1. Sintomáticos e Antieméticos',
            nome: 'Dipirona Ampola EV/IM 500 mg/mL',
            apresentacao: '500 mg/mL (Ampola de 2 mL = 1000 mg)',
            posologiaStd: '10 a 25 mg/kg/dose EV/IM (6/6h ou 8/8h)',
            doseMgKg: 15,
            concentracaoMgMl: 500,
            tetoDoseMg: 1000,
            tetoDiaMg: 4000,
            frequencia: 'por via endovenosa lenta ou intramuscular de 6/6h',
            unidadeDosagem: 'mL',
            keywords: 'dipirona ampola injetavel ev im febre alta dor emergência',
            doseAdulta: { doseMg: 1000, vol: '2 mL (1.000 mg) EV/IM de 6/6h' }
        },
        {
            id: 'ondansetrona_sol',
            categoria: 'sintomaticos',
            categoriaNome: '1. Sintomáticos e Antieméticos',
            nome: 'Ondansetrona Solução Oral 0,8 mg/mL',
            apresentacao: '0,8 mg/mL (4 mg / 5 mL)',
            posologiaStd: '0,15 mg/kg/dose (8/8h se náuseas ou vômitos)',
            doseMgKg: 0.15,
            concentracaoMgMl: 0.8,
            tetoDoseMg: 8,
            tetoDiaMg: 24,
            frequencia: 'de 8 em 8 horas se náuseas ou vômitos',
            unidadeDosagem: 'mL',
            keywords: 'ondansetrona vonau solucao vomito emese gastroenterite',
            doseAdulta: { doseMg: 8, vol: '10 mL (8 mg) 8/8h' }
        },
        {
            id: 'ondansetrona_gotas',
            categoria: 'sintomaticos',
            categoriaNome: '1. Sintomáticos e Antieméticos',
            nome: 'Ondansetrona Gotas 2 mg/mL',
            apresentacao: '2 mg/mL (1 mL = 20 gotas | 1 gota = 0,1 mg)',
            posologiaStd: '0,15 mg/kg/dose (8/8h se vômitos)',
            doseMgKg: 0.15,
            concentracaoMgMl: 2,
            gotasPorMl: 20,
            tetoDoseMg: 8,
            tetoDiaMg: 24,
            frequencia: 'de 8 em 8 horas se náuseas ou vômitos',
            unidadeDosagem: 'gotas',
            keywords: 'ondansetrona vonau gotas vomito emese nausea',
            doseAdulta: { doseMg: 8, vol: '80 gotas (8 mg) 8/8h — ou usar comprimido 8 mg' }
        },
        {
            id: 'ondansetrona_comp',
            categoria: 'sintomaticos',
            categoriaNome: '1. Sintomáticos e Antieméticos',
            nome: 'Ondansetrona Comprimido (4 mg / 8 mg)',
            apresentacao: 'Comprimido 4 mg e 8 mg (desintegração oral / orodispersível)',
            posologiaStd: '<15kg: 2-4 mg | 15-30kg: 4 mg | >30kg: 8 mg (8/8h)',
            doseMgKg: 0.15,
            tetoDoseMg: 8,
            frequencia: 'de 8 em 8 horas se náuseas ou vômitos',
            unidadeDosagem: 'comprimido',
            keywords: 'ondansetrona vonau flash comprimido orodispersivel vomito',
            calculoEspecial: (peso) => {
                let doseMg = 4;
                let desc = '1 comprimido de 4 mg';
                if (peso < 15) {
                    doseMg = 2;
                    desc = '1/2 comprimido de 4 mg (2 mg)';
                } else if (peso <= 30) {
                    doseMg = 4;
                    desc = '1 comprimido de 4 mg';
                } else {
                    doseMg = 8;
                    desc = '1 comprimido de 8 mg (ou 2 comp. de 4 mg)';
                }
                return { doseMg, volumeTexto: desc, tetoAtingido: peso > 30 };
            }
        },
        {
            id: 'ondansetrona_ampola',
            categoria: 'sintomaticos',
            categoriaNome: '1. Sintomáticos e Antieméticos',
            nome: 'Ondansetrona Ampola EV/IM',
            apresentacao: '2 mg/mL (Ampola de 2 mL = 4 mg ou 4 mL = 8 mg)',
            posologiaStd: '0,15 mg/kg/dose EV lento (8/8h se vômitos)',
            doseMgKg: 0.15,
            concentracaoMgMl: 2,
            tetoDoseMg: 8,
            tetoDiaMg: 24,
            frequencia: 'por via endovenosa lenta (8/8h se vômitos)',
            unidadeDosagem: 'mL',
            keywords: 'ondansetrona ampola ev im vomito emergência hospitalar'
        },
        {
            id: 'bromoprida_gotas',
            categoria: 'sintomaticos',
            categoriaNome: '1. Sintomáticos e Antieméticos',
            nome: 'Bromoprida Gotas 4 mg/mL',
            apresentacao: '4 mg/mL (24 gotas = 1 mL | 1 gota ≈ 0,16 mg)',
            posologiaStd: '0,5 a 1 gota/kg/dose (0,1 a 0,15 mg/kg/dose em 8/8h)',
            doseMgKg: 0.15,
            concentracaoMgMl: 4,
            gotasPorMl: 24,
            tetoDoseMg: 10,
            tetoDiaMg: 30,
            frequencia: 'de 8 em 8 horas 30 min antes das refeições',
            unidadeDosagem: 'gotas',
            keywords: 'bromoprida digesan gotas vomito procinetico nausea'
        },
        {
            id: 'bromoprida_sol_oral',
            categoria: 'sintomaticos',
            categoriaNome: '1. Sintomáticos e Antieméticos',
            nome: 'Bromoprida Solução Oral 1 mg/mL',
            apresentacao: '1 mg/mL (1 mg/mL)',
            posologiaStd: '0,15 mg/kg/dose (8/8h)',
            doseMgKg: 0.15,
            concentracaoMgMl: 1,
            tetoDoseMg: 10,
            tetoDiaMg: 30,
            frequencia: 'de 8 em 8 horas 30 min antes das refeições',
            unidadeDosagem: 'mL',
            keywords: 'bromoprida digesan solucao xarope vomito procinetico'
        },
        {
            id: 'simeticona_gotas',
            categoria: 'sintomaticos',
            categoriaNome: '1. Sintomáticos e Antieméticos',
            nome: 'Simeticona Gotas 75 mg/mL',
            apresentacao: '75 mg/mL (30 gotas = 1 mL | 1 gota = 2,5 mg)',
            posologiaStd: '<2 anos: 20 mg (8 gotas) | >2 anos: 40 mg (16 gotas)',
            doseMgKg: 0,
            concentracaoMgMl: 75,
            gotasPorMl: 30,
            tetoDoseMg: 40,
            frequencia: 'de 8 em 8 horas após as refeições se cólica/gases',
            unidadeDosagem: 'gotas',
            keywords: 'simeticona luftal gotas colica gases estufamento',
            calculoEspecial: (peso, idadeNum, idadeUnidade) => {
                let idadeMeses = idadeNum;
                if (idadeUnidade === 'anos') idadeMeses = idadeNum * 12;

                let doseMg = 40;
                let gotas = 16;
                let ml = 0.53;
                let faixaTexto = 'Criança >= 2 anos';

                if (!isNaN(idadeMeses) && idadeMeses < 24) {
                    doseMg = 20;
                    gotas = 8;
                    ml = 0.27;
                    faixaTexto = 'Lactente < 2 anos';
                }

                return {
                    doseMg,
                    volumeTexto: `${gotas} gotas (${ml.toFixed(2)} mL) [${faixaTexto}]`,
                    tetoAtingido: false
                };
            }
        },
        {
            id: 'dexclorfeniramina_gotas',
            categoria: 'sintomaticos',
            categoriaNome: '1. Sintomáticos e Antieméticos',
            nome: 'Dexclorfeniramina Gotas 2 mg/mL',
            apresentacao: '2 mg/mL (1 mL = 20 gotas | 1 gota = 0,1 mg)',
            posologiaStd: '0,15 mg/kg/dia divididos em 3-4 tomadas (8/8h ou 6/6h)',
            doseMgKg: 0.04,
            concentracaoMgMl: 2,
            gotasPorMl: 20,
            tetoDoseMg: 2,
            tetoDiaMg: 6,
            frequencia: 'de 8 em 8 horas se sintomas alérgicos',
            unidadeDosagem: 'gotas',
            keywords: 'dexclorfeniramina polaramine gotas alergia coceira urticaria'
        },
        {
            id: 'dexclorfeniramina_xarope',
            categoria: 'sintomaticos',
            categoriaNome: '1. Sintomáticos e Antieméticos',
            nome: 'Dexclorfeniramina Xarope 0,4 mg/mL',
            apresentacao: '0,4 mg/mL (2 mg / 5 mL)',
            posologiaStd: '0,15 mg/kg/dia divididos em 3-4 tomadas (8/8h ou 6/6h)',
            doseMgKg: 0.04,
            concentracaoMgMl: 0.4,
            tetoDoseMg: 2,
            tetoDiaMg: 6,
            frequencia: 'de 8 em 8 horas se sintomas alérgicos',
            unidadeDosagem: 'mL',
            keywords: 'dexclorfeniramina polaramine xarope alergia coceira rhinite'
        },
        {
            id: 'desloratadina_xarope',
            categoria: 'sintomaticos',
            categoriaNome: '1. Sintomáticos e Antieméticos',
            nome: 'Desloratadina Xarope / Solução Oral',
            apresentacao: '0,5 mg/mL (0,5 mg / mL)',
            posologiaStd: '6-11m: 1mg (2mL) | 1-5a: 1,25mg (2,5mL) | 6-11a: 2,5mg (5mL) | >=12a: 5mg (10mL)',
            doseMgKg: 0,
            tetoDoseMg: 5,
            frequencia: 'uma vez ao dia (24/24h)',
            unidadeDosagem: 'mL',
            keywords: 'desloratadina desalex xarope solucao alergia rinite 24h',
            calculoEspecial: (peso, idadeNum, idadeUnidade) => {
                let idadeMeses = idadeNum;
                if (idadeUnidade === 'anos') idadeMeses = idadeNum * 12;

                let doseMg = 1.25;
                let ml = 2.5;
                let faixaText = '1 a 5 anos';

                if (!isNaN(idadeMeses)) {
                    if (idadeMeses < 12) {
                        doseMg = 1.0;
                        ml = 2.0;
                        faixaText = '6 a 11 meses';
                    } else if (idadeMeses <= 60) {
                        doseMg = 1.25;
                        ml = 2.5;
                        faixaText = '1 a 5 anos';
                    } else if (idadeMeses <= 132) {
                        doseMg = 2.5;
                        ml = 5.0;
                        faixaText = '6 a 11 anos';
                    } else {
                        doseMg = 5.0;
                        ml = 10.0;
                        faixaText = '>= 12 anos';
                    }
                } else if (peso > 0) {
                    doseMg = Math.min(5, peso * 0.05);
                    ml = doseMg / 0.5;
                    faixaText = 'baseado no peso';
                }

                return {
                    doseMg,
                    volumeTexto: `${ml.toFixed(1)} mL (${doseMg} mg) [${faixaText}]`,
                    tetoAtingido: doseMg >= 5
                };
            }
        },
        {
            id: 'furosemida_oral_ev',
            categoria: 'sintomaticos',
            categoriaNome: '1. Sintomáticos e Antieméticos',
            nome: 'Furosemida (Sol. Oral 10 mg/mL / Ampola 10 mg/mL / Comp 40 mg)',
            apresentacao: 'Sol. Oral 10 mg/mL | Ampola 10 mg/mL (2 mL) | Comp. 40 mg',
            posologiaStd: '1 a 2 mg/kg/dose VO/EV/IM (12/12h ou 24/24h)',
            opcoes: [
                { id: 'sol_oral', nome: 'Solução Oral (10 mg/mL)', conc: 10, unit: 'mL', freq: 'de 12/12h ou 24/24h VO' },
                { id: 'ampola', nome: 'Ampola EV/IM (10 mg/mL)', conc: 10, unit: 'mL', freq: 'de 12/12h ou 24/24h EV/IM' },
                { id: 'comprimido', nome: 'Comprimido 40 mg', conc: 40, unit: 'comp', freq: 'de 12/12h ou 24/24h VO' }
            ],
            frequencia: 'de 12/12h ou 24/24h',
            unidadeDosagem: 'mL',
            keywords: 'furosemida lasix diuretico edema hipertensao insuficiencia cardiaca',
            calculoEspecial: (peso, idadeNum, idadeUnidade, opcaoSel) => {
                let doseMg = peso * 1;
                let tetoAtingido = false;
                if (doseMg > 40) {
                    doseMg = 40;
                    tetoAtingido = true;
                }

                if (opcaoSel === 'comprimido') {
                    const fracao = doseMg / 40;
                    let desc = '1/4 comprimido de 40 mg';
                    if (fracao >= 0.75) desc = '1 comprimido de 40 mg';
                    else if (fracao >= 0.4) desc = '1/2 comprimido de 40 mg';
                    return { doseMg, volumeTexto: desc, tetoAtingido };
                } else {
                    const ml = doseMg / 10;
                    return { doseMg, volumeTexto: `${ml.toFixed(1)} mL (${doseMg.toFixed(1)} mg)`, tetoAtingido };
                }
            }
        },

        {
            id: 'nimesulida_comp',
            categoria: 'sintomaticos',
            categoriaNome: '1. Sintomáticos e Antieméticos',
            nome: 'Nimesulida Comprimido 100 mg',
            apresentacao: 'Comprimido 100 mg',
            posologiaStd: '100 mg 12/12h por no máximo 5 a 7 dias, após as refeições (adulto)',
            frequencia: 'de 12 em 12 horas, após as refeições, por no máximo 5 a 7 dias',
            unidadeDosagem: 'comprimido',
            modo: 'adulto',
            keywords: 'nimesulida nisulid antiinflamatorio aine dor febre adulto',
            doseAdulta: { doseMg: 100, vol: '1 comprimido de 100 mg' }
        },
        {
            id: 'tramadol_caps',
            categoria: 'sintomaticos',
            categoriaNome: '1. Sintomáticos e Antieméticos',
            nome: 'Tramadol Cápsula 50 mg',
            apresentacao: 'Cápsula 50 mg (opioide — receita especial)',
            posologiaStd: '50 a 100 mg 6/6h ou 8/8h para dor moderada a grave (adulto)',
            frequencia: 'de 6 em 6 horas ou de 8 em 8 horas, conforme necessidade de dor',
            unidadeDosagem: 'capsula',
            modo: 'adulto',
            keywords: 'tramadol tramal opioide analgesico dor moderada grave adulto',
            doseAdulta: { doseMg: 50, vol: '1 a 2 cápsulas de 50 mg (50 a 100 mg)' }
        },
        {
            id: 'morfina_comp',
            categoria: 'sintomaticos',
            categoriaNome: '1. Sintomáticos e Antieméticos',
            nome: 'Morfina Comprimido 10 mg / 30 mg',
            apresentacao: 'Comprimido 10 mg e 30 mg (controle especial — dor crônica/oncologia)',
            posologiaStd: '10 a 30 mg a cada 4 horas, com titulação individual (adulto)',
            opcoes: [
                { id: 'morf_10', nome: 'Comprimido 10 mg (4/4h)', doseMg: 10 },
                { id: 'morf_30', nome: 'Comprimido 30 mg (4/4h)', doseMg: 30 }
            ],
            frequencia: 'a cada 4 horas, conforme titulação de dor',
            unidadeDosagem: 'comprimido',
            modo: 'adulto',
            keywords: 'morfina dimorf opioide forte dor cronica oncologia paliativo adulto',
            calculoEspecial: (peso, idadeNum, idadeUnidade, opcaoSel) => {
                const doseMg = opcaoSel === 'morf_30' ? 30 : 10;
                return { doseMg, volumeTexto: `1 comprimido de ${doseMg} mg`, tetoAtingido: false };
            }
        },
        {
            id: 'ibuprofeno_comp',
            categoria: 'sintomaticos',
            categoriaNome: '1. Sintomáticos e Antieméticos',
            nome: 'Ibuprofeno Comprimido 300 mg / 600 mg',
            apresentacao: 'Comprimido 300 mg e 600 mg',
            posologiaStd: '300 a 600 mg 6/6h ou 8/8h, de preferência após as refeições (adulto)',
            opcoes: [
                { id: 'ibu_300', nome: 'Comprimido 300 mg (6/6h ou 8/8h)', doseMg: 300 },
                { id: 'ibu_600', nome: 'Comprimido 600 mg (6/6h ou 8/8h)', doseMg: 600 }
            ],
            frequencia: 'de 6 em 6 horas ou de 8 em 8 horas, após as refeições',
            unidadeDosagem: 'comprimido',
            modo: 'adulto',
            keywords: 'ibuprofeno comprimido alivium advil antiinflamatorio dor febre adulto',
            calculoEspecial: (peso, idadeNum, idadeUnidade, opcaoSel) => {
                const doseMg = opcaoSel === 'ibu_600' ? 600 : 300;
                return { doseMg, volumeTexto: `1 comprimido de ${doseMg} mg`, tetoAtingido: false };
            }
        },
        {
            id: 'metoclopramida_comp',
            categoria: 'sintomaticos',
            categoriaNome: '1. Sintomáticos e Antieméticos',
            nome: 'Metoclopramida Comprimido 10 mg',
            apresentacao: 'Comprimido 10 mg',
            posologiaStd: '10 mg até 8/8h, 10 a 30 min antes das refeições (adulto)',
            frequencia: 'até de 8 em 8 horas, 10 a 30 minutos antes das refeições',
            unidadeDosagem: 'comprimido',
            modo: 'adulto',
            keywords: 'metoclopramida plasil procinetico antiemetico nausea vomito adulto',
            doseAdulta: { doseMg: 10, vol: '1 comprimido de 10 mg' }
        },
        {
            id: 'loratadina_comp',
            categoria: 'sintomaticos',
            categoriaNome: '1. Sintomáticos e Antieméticos',
            nome: 'Loratadina Comprimido 10 mg',
            apresentacao: 'Comprimido 10 mg',
            posologiaStd: '10 mg uma vez ao dia (adulto e > 12 anos)',
            frequencia: 'uma vez ao dia',
            unidadeDosagem: 'comprimido',
            modo: 'adulto',
            keywords: 'loratadina claritin antialergico antihistaminico rinite urticaria adulto',
            doseAdulta: { doseMg: 10, vol: '1 comprimido de 10 mg' }
        },
        {
            id: 'dexclorfeniramina_comp',
            categoria: 'sintomaticos',
            categoriaNome: '1. Sintomáticos e Antieméticos',
            nome: 'Dexclorfeniramina Comprimido 2 mg',
            apresentacao: 'Comprimido 2 mg',
            posologiaStd: '2 mg de 6/6h ou 8/8h (adulto)',
            frequencia: 'de 6 em 6 horas ou de 8 em 8 horas',
            unidadeDosagem: 'comprimido',
            modo: 'adulto',
            keywords: 'dexclorfeniramina polaramine comprimido antialergico antihistaminico adulto',
            doseAdulta: { doseMg: 2, vol: '1 comprimido de 2 mg' }
        },
        // =====================================================================
        // 2. GASTROINTESTINAIS E IBP
        // =====================================================================
        {
            id: 'omeprazol',
            categoria: 'gastro',
            categoriaNome: '2. Gastrointestinais e IBP',
            nome: 'Omeprazol Cápsulas 10 mg / 20 mg / 40 mg',
            apresentacao: 'Cápsulas 10 mg, 20 mg e 40 mg (grânulos ácido-resistentes)',
            posologiaStd: '< 1 ano: 0,7 a 1,5 mg/kg/dia | >= 1 ano: 1 a 2 mg/kg/dia (Máx: 40 mg/dia)',
            opcoes: [
                { id: 'lactente', nome: '< 1 ano (1 mg/kg/dia)', mgKg: 1 },
                { id: 'crianca', nome: '>= 1 ano (1,5 mg/kg/dia)', mgKg: 1.5 }
            ],
            frequencia: 'uma vez ao dia, pela manhã em jejum',
            unidadeDosagem: 'mg',
            keywords: 'omeprazol ibp inibidor bomba protons gastrite refluxo drge ulcera digestiva losec',
            doseAdulta: { doseMg: 20, vol: '1 cápsula de 20 mg (pode dobrar para 40 mg/dia se necessário)' },
            calculoEspecial: (peso, idadeNum, idadeUnidade, opcaoSel) => {
                const mgKg = opcaoSel === 'lactente' ? 1 : 1.5;
                let doseMg = peso * mgKg;
                let tetoAtingido = false;
                if (doseMg > 40) { doseMg = 40; tetoAtingido = true; }
                return {
                    doseMg,
                    volumeTexto: `${doseMg.toFixed(1)} mg VO em jejum (cáps 10/20/40 mg — não mastigar nem triturar os grânulos)`,
                    tetoAtingido
                };
            }
        },
        {
            id: 'pantoprazol',
            categoria: 'gastro',
            categoriaNome: '2. Gastrointestinais e IBP',
            nome: 'Pantoprazol Comprimidos 20 mg / 40 mg',
            apresentacao: 'Comprimido gastrorresistente 20 mg e 40 mg (uso > 5 anos)',
            posologiaStd: '5 a 11 anos (15-40 kg): 20 mg/dia | >= 12 anos (> 40 kg): 20 a 40 mg/dia',
            opcoes: [
                { id: 'crianca_5_11', nome: '5 a 11 anos / 15-40 kg (20 mg/dia)', doseMg: 20 },
                { id: 'maior_12', nome: '>= 12 anos / > 40 kg (40 mg/dia)', doseMg: 40 }
            ],
            frequencia: 'uma vez ao dia, preferencialmente pela manhã',
            unidadeDosagem: 'comprimido',
            keywords: 'pantoprazol ibp inibidor bomba protons gastrite ulcera refluxo drge pantozol',
            doseAdulta: { doseMg: 40, vol: '1 comprimido de 40 mg' },
            calculoEspecial: (peso, idadeNum, idadeUnidade, opcaoSel) => {
                const doseMg = opcaoSel === 'maior_12' ? 40 : 20;
                return {
                    doseMg,
                    volumeTexto: `1 comprimido de ${doseMg} mg (não quebrar, triturar ou mastigar)`,
                    tetoAtingido: false
                };
            }
        },
        {
            id: 'hidroxido_aluminio',
            categoria: 'gastro',
            categoriaNome: '2. Gastrointestinais e IBP',
            nome: 'Hidróxido de Alumínio Suspensão 60 mg/mL',
            apresentacao: 'Suspensão oral 60 mg/mL (antiácido)',
            posologiaStd: '5 a 10 mL, 3 a 4 vezes ao dia, 1h após as refeições e ao deitar (adulto)',
            frequencia: '3 a 4 vezes ao dia, 1 hora após as refeições e ao deitar',
            unidadeDosagem: 'fixa',
            modo: 'adulto',
            keywords: 'hidroxido aluminio antiacido azia queimacao gastrite estomago pepsamar',
            doseAdulta: { doseMg: 600, vol: '5 a 10 mL da suspensão (agitar antes de usar)' }
        },
        // =====================================================================
        // 3. CORTICOIDES E BRONCODILATADORES
        // =====================================================================
        {
            id: 'prednisolona_1mg',
            categoria: 'corticoides',
            categoriaNome: '3. Corticoides e Broncodilatadores',
            nome: 'Prednisolona Solução Oral 1 mg/mL',
            apresentacao: '1 mg/mL (Prelone / Sterapred)',
            posologiaStd: '1 a 2 mg/kg/dia em dose única matinal (3 a 5 dias)',
            doseMgKg: 1,
            concentracaoMgMl: 1,
            tetoDoseMg: 60,
            tetoDiaMg: 60,
            frequencia: 'uma vez ao dia pela manhã por 3 a 5 dias',
            unidadeDosagem: 'mL',
            keywords: 'prednisolona prelone solucao corticoide asma sibilo alergia'
        },
        {
            id: 'prednisolona_3mg',
            categoria: 'corticoides',
            categoriaNome: '3. Corticoides e Broncodilatadores',
            nome: 'Prednisolona Solução Oral 3 mg/mL',
            apresentacao: '3 mg/mL (3 mg / mL)',
            posologiaStd: '1 a 2 mg/kg/dia em dose única matinal (3 a 5 dias)',
            doseMgKg: 1,
            concentracaoMgMl: 3,
            tetoDoseMg: 60,
            tetoDiaMg: 60,
            frequencia: 'uma vez ao dia pela manhã por 3 a 5 dias',
            unidadeDosagem: 'mL',
            keywords: 'prednisolona prelone 3mg solucao concentrada corticoide asma'
        },
        {
            id: 'dexametasona_elixir',
            categoria: 'corticoides',
            categoriaNome: '3. Corticoides e Broncodilatadores',
            nome: 'Dexametasona Elixir 0,1 mg/mL',
            apresentacao: '0,1 mg/mL (0,5 mg / 5 mL)',
            posologiaStd: 'Crupe: 0,6 mg/kg dose única | Anti-inflamatório: 0,15 mg/kg/dia',
            opcoes: [
                { id: 'crupe', nome: 'Regra Crupe (Dose Única 0,6 mg/kg)', doseMgKg: 0.6, teto: 16, freq: 'dose única no atendimento' },
                { id: 'habitual', nome: 'Habitual Anti-inflamatório (0,15 mg/kg/dia)', doseMgKg: 0.05, teto: 10, freq: 'de 8 em 8 horas' }
            ],
            frequencia: 'dose única no atendimento',
            unidadeDosagem: 'mL',
            keywords: 'dexametasona decadron elixir crupe laringite corticoide',
            calculoEspecial: (peso, idadeNum, idadeUnidade, opcaoSel) => {
                const op = opcaoSel === 'habitual' ? 0.05 : 0.6;
                const teto = opcaoSel === 'habitual' ? 10 : 16;
                let doseMg = peso * op;
                let tetoAtingido = false;
                if (doseMg > teto) {
                    doseMg = teto;
                    tetoAtingido = true;
                }
                const ml = doseMg / 0.1;
                return { doseMg, volumeTexto: `${ml.toFixed(1)} mL`, tetoAtingido };
            }
        },
        {
            id: 'dexametasona_ampola',
            categoria: 'corticoides',
            categoriaNome: '3. Corticoides e Broncodilatadores',
            nome: 'Dexametasona Ampola EV/IM',
            apresentacao: '4 mg/mL (Ampola de 1 mL ou 2,5 mL = 10 mg)',
            posologiaStd: 'Crupe: 0,6 mg/kg EV/IM dose única | Habitual: 0,15 mg/kg/dia EV/IM',
            opcoes: [
                { id: 'crupe', nome: 'Regra Crupe (0,6 mg/kg EV/IM Dose Única)', doseMgKg: 0.6, teto: 16, freq: 'via IM ou EV em dose única' },
                { id: 'habitual', nome: 'Habitual EV/IM (0,15 mg/kg/dia)', doseMgKg: 0.05, teto: 10, freq: 'de 8 em 8 horas via EV ou IM' }
            ],
            frequencia: 'via IM ou EV em dose única',
            unidadeDosagem: 'mL',
            keywords: 'dexametasona ampola injetavel im ev crupe laringite emergency',
            calculoEspecial: (peso, idadeNum, idadeUnidade, opcaoSel) => {
                const op = opcaoSel === 'habitual' ? 0.05 : 0.6;
                const teto = opcaoSel === 'habitual' ? 10 : 16;
                let doseMg = peso * op;
                let tetoAtingido = false;
                if (doseMg > teto) {
                    doseMg = teto;
                    tetoAtingido = true;
                }
                const ml = doseMg / 4;
                return { doseMg, volumeTexto: `${ml.toFixed(2)} mL`, tetoAtingido };
            }
        },
        {
            id: 'hidrocortisona_ampola',
            categoria: 'corticoides',
            categoriaNome: '3. Corticoides e Broncodilatadores',
            nome: 'Hidrocortisona Frasco-Ampola',
            apresentacao: 'Frasco-ampola 100 mg e 500 mg (EV)',
            posologiaStd: 'Ataque Asma: 4 a 8 mg/kg EV | Manutenção: 2 a 4 mg/kg EV (6/6h)',
            opcoes: [
                { id: 'ataque', nome: 'Dose de Ataque Asma (8 mg/kg EV)', doseMgKg: 8, teto: 500, freq: 'em dose única por via EV rápida' },
                { id: 'manutencao', nome: 'Dose de Manutenção (4 mg/kg EV)', doseMgKg: 4, teto: 250, freq: 'de 6 em 6 horas por via EV' }
            ],
            frequencia: 'por via EV',
            unidadeDosagem: 'mg',
            keywords: 'hidrocortisona flebocortid ampola ev asma ataque crise broncoespasmo',
            calculoEspecial: (peso, idadeNum, idadeUnidade, opcaoSel) => {
                const isManut = opcaoSel === 'manutencao';
                const mgKg = isManut ? 4 : 8;
                const teto = isManut ? 250 : 500;

                let doseMg = peso * mgKg;
                let tetoAtingido = false;
                if (doseMg > teto) {
                    doseMg = teto;
                    tetoAtingido = true;
                }

                const mlFa100 = doseMg / 50;
                return {
                    doseMg,
                    volumeTexto: `${doseMg.toFixed(0)} mg (~ ${mlFa100.toFixed(1)} mL de sol. 50mg/mL)`,
                    tetoAtingido
                };
            }
        },
        {
            id: 'salbutamol_nebulizacao',
            categoria: 'corticoides',
            categoriaNome: '3. Corticoides e Broncodilatadores',
            nome: 'Salbutamol Solução para Nebulização',
            apresentacao: '5 mg/mL (0,5% | 1 mL = 20 gotas | 1 gota = 0,25 mg)',
            posologiaStd: '0,05 a 0,15 mg/kg/dose (1 gota a cada 2-3 kg | Mín. 5 got | Máx 20 got)',
            doseMgKg: 0.1,
            tetoDoseMg: 5,
            frequencia: 'diluído em 3 a 5 mL de SF 0,9% em nebulização a cada 20 min (crise) ou 6/6h',
            unidadeDosagem: 'gotas',
            keywords: 'salbutamol aerolin nebulizacao inalacao gota broncodilatador asma',
            calculoEspecial: (peso) => {
                let gotas = Math.round(peso / 2);
                if (gotas < 5) gotas = 5;
                if (gotas > 20) gotas = 20;

                const doseMg = gotas * 0.25;
                return {
                    doseMg,
                    volumeTexto: `${gotas} gotas em 3 a 5 mL de SF 0,9%`,
                    tetoAtingido: gotas >= 20
                };
            }
        },
        {
            id: 'salbutamol_spray',
            categoria: 'corticoides',
            categoriaNome: '3. Corticoides e Broncodilatadores',
            nome: 'Salbutamol Spray Aerossol',
            apresentacao: '100 mcg / jato (com espaçador valvulado)',
            posologiaStd: 'Crise leve/mod: 2 a 4 jatos | Crise grave: 4 a 10 jatos (a cada 20 min)',
            opcoes: [
                { id: 'leve', nome: 'Crise Leve / Moderada (2 a 4 jatos)', jatos: '2 a 4 jatos' },
                { id: 'grave', nome: 'Crise Grave (4 a 10 jatos)', jatos: '4 a 10 jatos' },
                { id: 'manutencao', nome: 'Manutenção (2 jatos de 6/6h ou 4/4h)', jatos: '2 jatos' }
            ],
            doseMgKg: 0,
            tetoDoseMg: 1,
            frequencia: 'com espaçador valvulado a cada 20 min na 1ª hora ou conforme resgate',
            unidadeDosagem: 'jatos',
            keywords: 'salbutamol aerolin bombinha spray jato espacador asma crise',
            calculoEspecial: (peso, idadeNum, idadeUnidade, opcaoSel) => {
                let jatosTexto = '2 a 4 jatos';
                if (opcaoSel === 'grave') jatosTexto = '4 a 10 jatos';
                if (opcaoSel === 'manutencao') jatosTexto = '2 jatos';

                return {
                    doseMg: 0.2,
                    volumeTexto: `${jatosTexto} com espaçador`,
                    tetoAtingido: false
                };
            }
        },

        {
            id: 'fluticasona_spray',
            categoria: 'corticoides',
            categoriaNome: '3. Corticoides e Broncodilatadores',
            nome: 'Fluticasona (Propionato) Spray 50 mcg / 250 mcg',
            apresentacao: 'Spray aerossol 50 mcg/jato e 250 mcg/jato (usar com espaçador)',
            posologiaStd: '1 a 4 anos: 100 mcg 2x/dia | > 4 anos: 50 a 200 mcg 2x/dia (GINA)',
            opcoes: [
                { id: 'f1_4anos', nome: '1 a 4 anos (100 mcg 12/12h = 2 jatos de 50 mcg)', jatos: '2 jatos do spray de 50 mcg' },
                { id: 'f_maior4_baixa', nome: '> 4 anos — dose baixa (50 mcg 12/12h = 1 jato de 50 mcg)', jatos: '1 jato do spray de 50 mcg' },
                { id: 'f_maior4_media', nome: '> 4 anos — dose moderada (200 mcg 12/12h = 4 jatos de 50 mcg)', jatos: '4 jatos do spray de 50 mcg (ou 1 jato de 250 mcg)' }
            ],
            frequencia: 'de 12 em 12 horas, com espaçador valvulado (enxaguar a boca após o uso)',
            unidadeDosagem: 'jatos',
            keywords: 'fluticasona propionato flixotide spray inalatorio corticoide asma manutencao gina',
            doseAdulta: { doseMg: 0.25, vol: '1 jato do spray de 250 mcg 12/12h' },
            calculoEspecial: (peso, idadeNum, idadeUnidade, opcaoSel) => {
                let jatosTexto = '2 jatos do spray de 50 mcg';
                let doseMg = 0.1;
                if (opcaoSel === 'f_maior4_baixa') { jatosTexto = '1 jato do spray de 50 mcg'; doseMg = 0.05; }
                if (opcaoSel === 'f_maior4_media') { jatosTexto = '4 jatos do spray de 50 mcg (ou 1 jato de 250 mcg)'; doseMg = 0.2; }
                return { doseMg, volumeTexto: `${jatosTexto} 12/12h com espaçador`, tetoAtingido: false };
            }
        },
        {
            id: 'budesonida_inalatoria',
            categoria: 'corticoides',
            categoriaNome: '3. Corticoides e Broncodilatadores',
            nome: 'Budesonida Spray / Suspensão para Nebulização',
            apresentacao: 'Spray 50 e 200 mcg/jato | Susp. nebulização 0,25 mg/mL e 0,5 mg/mL',
            posologiaStd: 'Manutenção asma: 100 a 400 mcg/dia (12/12h) | Crupe viral: 2 mg dose única nebulizado',
            opcoes: [
                { id: 'b_manutencao', nome: 'Manutenção Asma (200 mcg 12/12h = 1 jato de 200 mcg)', jatos: '1 jato do spray de 200 mcg (ou 4 jatos de 50 mcg) 12/12h' },
                { id: 'b_crupe', nome: 'Crupe Viral — Nebulização 2 mg dose única (4 mL de 0,5 mg/mL)', jatos: '4 mL da susp. 0,5 mg/mL (2 mg) nebulizados' }
            ],
            frequencia: 'de 12 em 12 horas',
            unidadeDosagem: 'jatos',
            keywords: 'budesonida busonid spray nebulizacao crupe laringite asma manutencao corticoide inalatorio',
            doseAdulta: { doseMg: 0.4, vol: '1 jato do spray de 200 mcg 12/12h (400 mcg/dia)' },
            calculoEspecial: (peso, idadeNum, idadeUnidade, opcaoSel) => {
                if (opcaoSel === 'b_crupe') {
                    return { doseMg: 2, volumeTexto: '4 mL da susp. 0,5 mg/mL (2 mg) em nebulização dose única (pode repetir em 12h)', tetoAtingido: false };
                }
                return { doseMg: 0.2, volumeTexto: '1 jato do spray de 200 mcg (ou 4 jatos de 50 mcg) 12/12h', tetoAtingido: false };
            }
        },
        {
            id: 'prednisona_comp',
            categoria: 'corticoides',
            categoriaNome: '3. Corticoides e Broncodilatadores',
            nome: 'Prednisona Comprimido 5 mg / 20 mg',
            apresentacao: 'Comprimido 5 mg e 20 mg',
            posologiaStd: '5 a 60 mg/dia em dose única matinal, após o café (adulto)',
            opcoes: [
                { id: 'pred_20', nome: 'Comprimido 20 mg', doseMg: 20 },
                { id: 'pred_40', nome: '40 mg/dia (2 comp de 20 mg)', doseMg: 40 },
                { id: 'pred_60', nome: '60 mg/dia (3 comp de 20 mg)', doseMg: 60 }
            ],
            frequencia: 'uma vez ao dia, pela manhã após o café (desmame conforme evolução)',
            unidadeDosagem: 'comprimido',
            modo: 'adulto',
            keywords: 'prednisona meticorten corticoide oral adulto asma alergia',
            calculoEspecial: (peso, idadeNum, idadeUnidade, opcaoSel) => {
                let doseMg = 20; let txt = '1 comprimido de 20 mg';
                if (opcaoSel === 'pred_40') { doseMg = 40; txt = '2 comprimidos de 20 mg (40 mg)'; }
                if (opcaoSel === 'pred_60') { doseMg = 60; txt = '3 comprimidos de 20 mg (60 mg)'; }
                return { doseMg, volumeTexto: `${txt} em dose única matinal`, tetoAtingido: false };
            }
        },
        {
            id: 'dexametasona_comp',
            categoria: 'corticoides',
            categoriaNome: '3. Corticoides e Broncodilatadores',
            nome: 'Dexametasona Comprimido 4 mg',
            apresentacao: 'Comprimido 4 mg',
            posologiaStd: '0,75 a 9 mg/dia, fracionado ou dose única matinal (adulto)',
            frequencia: 'conforme indicação (dose única matinal ou fracionada)',
            unidadeDosagem: 'comprimido',
            modo: 'adulto',
            keywords: 'dexametasona decadron comprimido corticoide oral adulto',
            doseAdulta: { doseMg: 4, vol: '1 comprimido de 4 mg (faixa: 0,75 a 9 mg/dia conforme indicação)' }
        },
        // =====================================================================
        // 4. ANTIBIÓTICOS ORAIS
        // =====================================================================
        {
            id: 'amoxicilina_250',
            categoria: 'orais',
            categoriaNome: '4. Antibióticos Orais',
            nome: 'Amoxicilina Suspensão 250 mg/5 mL',
            apresentacao: '250 mg / 5 mL (50 mg/mL)',
            posologiaStd: 'Habitual: 50 mg/kg/dia (8/8h) | Alta Dose OMA: 80-90 mg/kg/dia (12/12h)',
            opcoes: [
                { id: 'habitual', nome: 'Dose Habitual (50 mg/kg/dia em 8/8h)', doseMgKg: 16.67, teto: 500, freq: 'de 8 em 8 horas por 7 a 10 dias' },
                { id: 'alta_dose', nome: 'Alta Dose / OMA (90 mg/kg/dia em 12/12h)', doseMgKg: 45, teto: 1000, freq: 'de 12 em 12 horas por 7 a 10 dias' }
            ],
            frequencia: 'de 8 em 8 horas por 7 a 10 dias',
            unidadeDosagem: 'mL',
            keywords: 'amoxicilina 250mg suspensao otite amigdalite pneumonia',
            doseAdulta: { doseMg: 500, vol: '10 mL (500 mg) 8/8h — preferir cápsula 500 mg' },
            calculoEspecial: (peso, idadeNum, idadeUnidade, opcaoSel) => {
                const isAlta = opcaoSel === 'alta_dose';
                const mgKg = isAlta ? 45 : 16.67;
                const teto = isAlta ? 1000 : 500;

                let doseMg = peso * mgKg;
                let tetoAtingido = false;
                if (doseMg > teto) {
                    doseMg = teto;
                    tetoAtingido = true;
                }
                const ml = doseMg / 50;
                return { doseMg, volumeTexto: `${ml.toFixed(1)} mL`, tetoAtingido };
            }
        },
        {
            id: 'amoxicilina_400',
            categoria: 'orais',
            categoriaNome: '4. Antibióticos Orais',
            nome: 'Amoxicilina Suspensão 400 mg/5 mL',
            apresentacao: '400 mg / 5 mL (80 mg/mL)',
            posologiaStd: 'Habitual: 50 mg/kg/dia (12/12h) | Alta Dose OMA: 80-90 mg/kg/dia (12/12h)',
            opcoes: [
                { id: 'habitual', nome: 'Dose Habitual (50 mg/kg/dia em 12/12h)', doseMgKg: 25, teto: 500, freq: 'de 12 em 12 horas por 7 a 10 dias' },
                { id: 'alta_dose', nome: 'Alta Dose / OMA (90 mg/kg/dia em 12/12h)', doseMgKg: 45, teto: 1000, freq: 'de 12 em 12 horas por 7 a 10 dias' }
            ],
            frequencia: 'de 12 em 12 horas por 7 a 10 dias',
            unidadeDosagem: 'mL',
            keywords: 'amoxicilina 400mg BD suspensao otite amigdalite pneumonia',
            doseAdulta: { doseMg: 875, vol: '11 mL (875 mg) 12/12h — preferir comprimido 875 mg' },
            calculoEspecial: (peso, idadeNum, idadeUnidade, opcaoSel) => {
                const isAlta = opcaoSel === 'alta_dose';
                const mgKg = isAlta ? 45 : 25;
                const teto = isAlta ? 1000 : 500;

                let doseMg = peso * mgKg;
                let tetoAtingido = false;
                if (doseMg > teto) {
                    doseMg = teto;
                    tetoAtingido = true;
                }
                const ml = doseMg / 80;
                return { doseMg, volumeTexto: `${ml.toFixed(1)} mL`, tetoAtingido };
            }
        },
        {
            id: 'amoxicilina_comp',
            categoria: 'orais',
            categoriaNome: '4. Antibióticos Orais',
            nome: 'Amoxicilina Comprimidos 500 mg / 875 mg',
            apresentacao: 'Comprimidos / Cápsulas 500 mg e 875 mg',
            posologiaStd: '500 mg 8/8h ou 875 mg 12/12h (Crianças > 30 kg / Adolescentes)',
            opcoes: [
                { id: 'comp_500', nome: 'Comprimido 500 mg (8/8h)', doseMg: 500, freq: 'de 8 em 8 horas por 7 a 10 dias' },
                { id: 'comp_875', nome: 'Comprimido 875 mg (12/12h)', doseMg: 875, freq: 'de 12 em 12 horas por 7 a 10 dias' }
            ],
            frequencia: 'de 8 em 8 horas por 7 a 10 dias',
            unidadeDosagem: 'comprimido',
            keywords: 'amoxicilina comprimido capsula 500mg 875mg adulto crianca grande',
            calculoEspecial: (peso, idadeNum, idadeUnidade, opcaoSel) => {
                const is875 = opcaoSel === 'comp_875';
                const doseMg = is875 ? 875 : 500;
                const txt = is875 ? '1 comprimido de 875 mg' : '1 comprimido de 500 mg';
                return { doseMg, volumeTexto: txt, tetoAtingido: peso >= 40 };
            }
        },
        {
            id: 'amoxicilina_clav_250',
            categoria: 'orais',
            categoriaNome: '4. Antibióticos Orais',
            nome: 'Amoxicilina + Clavulanato 250+62,5 mg/5 mL',
            apresentacao: '250 mg + 62,5 mg / 5 mL (50 mg/mL de Amoxicilina)',
            posologiaStd: '40 a 50 mg/kg/dia de amoxicilina divididos em 8/8h',
            doseMgKg: 15,
            concentracaoMgMl: 50,
            tetoDoseMg: 500,
            tetoDiaMg: 1500,
            frequencia: 'de 8 em 8 horas por 7 a 10 dias',
            unidadeDosagem: 'mL',
            keywords: 'amoxicilina clavulanato clavulin 250mg suspensao otite sinusite'
        },
        {
            id: 'amoxicilina_clav_400',
            categoria: 'orais',
            categoriaNome: '4. Antibióticos Orais',
            nome: 'Amoxicilina + Clavulanato 400+57 mg/5 mL',
            apresentacao: '400 mg + 57 mg / 5 mL (80 mg/mL de Amoxicilina)',
            posologiaStd: '45 a 90 mg/kg/dia de amoxicilina divididos em 12/12h',
            doseMgKg: 22.5,
            concentracaoMgMl: 80,
            tetoDoseMg: 875,
            tetoDiaMg: 1750,
            frequencia: 'de 12 em 12 horas por 7 a 10 dias',
            unidadeDosagem: 'mL',
            keywords: 'amoxicilina clavulanato clavulin BD 400mg suspensao otite'
        },
        {
            id: 'amoxicilina_clav_comp',
            categoria: 'orais',
            categoriaNome: '4. Antibióticos Orais',
            nome: 'Amoxicilina + Clavulanato Comprimidos (500+125 mg / 875+125 mg)',
            apresentacao: 'Comprimidos Revestidos 500+125 mg e 875+125 mg',
            posologiaStd: '500/125 mg (8/8h) ou 875/125 mg (12/12h)',
            opcoes: [
                { id: 'comp_500_125', nome: 'Comprimido 500 + 125 mg (8/8h)', doseMg: 500, freq: 'de 8 em 8 horas junto às refeições' },
                { id: 'comp_875_125', nome: 'Comprimido 875 + 125 mg (12/12h)', doseMg: 875, freq: 'de 12 em 12 horas junto às refeições' }
            ],
            frequencia: 'de 12 em 12 horas junto às refeições',
            unidadeDosagem: 'comprimido',
            keywords: 'amoxicilina clavulanato comprimido 500 875 clavulin adulto',
            calculoEspecial: (peso, idadeNum, idadeUnidade, opcaoSel) => {
                const is875 = opcaoSel === 'comp_875_125';
                const doseMg = is875 ? 875 : 500;
                const txt = is875 ? '1 comprimido de 875/125 mg' : '1 comprimido de 500/125 mg';
                return { doseMg, volumeTexto: txt, tetoAtingido: peso >= 40 };
            }
        },
        {
            id: 'cefalexina_susp',
            categoria: 'orais',
            categoriaNome: '4. Antibióticos Orais',
            nome: 'Cefalexina Suspensão 250 mg/5 mL',
            apresentacao: '250 mg / 5 mL (50 mg/mL)',
            posologiaStd: '50 mg/kg/dia divididos em 4 doses (6/6h)',
            doseMgKg: 12.5,
            concentracaoMgMl: 50,
            tetoDoseMg: 500,
            tetoDiaMg: 2000,
            frequencia: 'de 6 em 6 horas por 7 a 10 dias',
            unidadeDosagem: 'mL',
            keywords: 'cefalexina keflex suspensao pele piodermite impertigo infeccao',
            doseAdulta: { doseMg: 500, vol: '10 mL (500 mg) 6/6h — preferir cápsula 500 mg' }
        },
        {
            id: 'cefalexina_caps',
            categoria: 'orais',
            categoriaNome: '4. Antibióticos Orais',
            nome: 'Cefalexina Cápsulas 500 mg',
            apresentacao: 'Cápsulas de 500 mg',
            posologiaStd: '50 mg/kg/dia divididos em 4 doses (6/6h | Máx 500 mg/dose)',
            doseMgKg: 12.5,
            tetoDoseMg: 500,
            frequencia: 'de 6 em 6 horas por 7 a 10 dias',
            unidadeDosagem: 'cápsula',
            keywords: 'cefalexina keflex capsula 500mg pele infantil adulto',
            calculoEspecial: (peso) => {
                let caps = Math.max(1, Math.round((peso * 12.5) / 500));
                if (caps > 1) caps = 1;
                return { doseMg: 500, volumeTexto: `${caps} cápsula de 500 mg`, tetoAtingido: peso >= 40 };
            }
        },
        {
            id: 'cefuroxima_susp',
            categoria: 'orais',
            categoriaNome: '4. Antibióticos Orais',
            nome: 'Cefuroxima Axetil Suspensão 250 mg/5 mL',
            apresentacao: '250 mg / 5 mL (50 mg/mL)',
            posologiaStd: '30 mg/kg/dia divididos em 2 doses (12/12h)',
            doseMgKg: 15,
            concentracaoMgMl: 50,
            tetoDoseMg: 500,
            tetoDiaMg: 1000,
            frequencia: 'de 12 em 12 horas junto às refeições por 10 dias',
            unidadeDosagem: 'mL',
            keywords: 'cefuroxima zinnat suspensao otite sinusite pneumonia'
        },
        {
            id: 'azitromicina_susp',
            categoria: 'orais',
            categoriaNome: '4. Antibióticos Orais',
            nome: 'Azitromicina Suspensão 200 mg/5 mL',
            apresentacao: '200 mg / 5 mL (40 mg/mL)',
            posologiaStd: '10 mg/kg/dia em dose única (24/24h) por 3 a 5 dias',
            doseMgKg: 10,
            concentracaoMgMl: 40,
            tetoDoseMg: 500,
            tetoDiaMg: 500,
            frequencia: 'uma vez ao dia por 3 a 5 dias',
            unidadeDosagem: 'mL',
            keywords: 'azitromicina zitromax suspensao macrolideo 3 dias 5 dias',
            doseAdulta: { doseMg: 500, vol: '12,5 mL (500 mg) 1x/dia por 3 a 5 dias — preferir comprimido' }
        },
        {
            id: 'azitromicina_comp',
            categoria: 'orais',
            categoriaNome: '4. Antibióticos Orais',
            nome: 'Azitromicina Comprimido 500 mg',
            apresentacao: 'Comprimido Revestido 500 mg',
            posologiaStd: '10 mg/kg/dia 1x/dia por 3 a 5 dias (Máx 500 mg/dia)',
            doseMgKg: 10,
            tetoDoseMg: 500,
            frequencia: 'uma vez ao dia por 3 a 5 dias',
            unidadeDosagem: 'comprimido',
            keywords: 'azitromicina zitromax comprimido 500mg macrolideo',
            calculoEspecial: (peso) => {
                return { doseMg: 500, volumeTexto: '1 comprimido de 500 mg', tetoAtingido: peso >= 45 };
            }
        },
        {
            id: 'smx_tmp_susp',
            categoria: 'orais',
            categoriaNome: '4. Antibióticos Orais',
            nome: 'Sulfametoxazol + Trimetoprima (SMX+TMP) Suspensão 200+40 mg/5 mL',
            apresentacao: '200 mg + 40 mg / 5 mL (40 mg/mL SMX | 8 mg/mL TMP)',
            posologiaStd: '40 mg/kg/dia SMX / 8 mg/kg/dia TMP (12/12h)',
            doseMgKg: 20,
            concentracaoMgMl: 40,
            tetoDoseMg: 800,
            tetoDiaMg: 1600,
            frequencia: 'de 12 em 12 horas por 7 a 10 dias',
            unidadeDosagem: 'mL',
            keywords: 'sulfametoxazol trimetoprima bactrim suspensao itu diarreia',
            doseAdulta: { doseMg: 800, vol: 'Usar comprimido FORTE (800/160 mg) 12/12h' }
        },
        {
            id: 'smx_tmp_forte_susp',
            categoria: 'orais',
            categoriaNome: '4. Antibióticos Orais',
            nome: 'Sulfametoxazol + Trimetoprima (SMX+TMP Forte / Comprimidos)',
            apresentacao: 'Susp. 400+80 mg/5 mL | Comp. 400+80 mg e 800+160 mg',
            posologiaStd: '40 mg/kg/dia SMX / 8 mg/kg/dia TMP (12/12h)',
            opcoes: [
                { id: 'susp_forte', nome: 'Suspensão Forte (400+80 mg / 5 mL)', conc: 80, unit: 'mL', freq: 'de 12 em 12 horas por 7 a 10 dias' },
                { id: 'comp_simples', nome: 'Comprimido Simples (400+80 mg)', conc: 400, unit: 'comp', freq: 'de 12 em 12 horas por 7 a 10 dias' },
                { id: 'comp_forte', nome: 'Comprimido Forte (800+160 mg)', conc: 800, unit: 'comp', freq: 'de 12 em 12 horas por 7 a 10 dias' }
            ],
            frequencia: 'de 12 em 12 horas por 7 a 10 dias',
            unidadeDosagem: 'mL',
            keywords: 'bactrim forte sulfametoxazol trimetoprima comprimido suspensao',
            calculoEspecial: (peso, idadeNum, idadeUnidade, opcaoSel) => {
                let doseSmx = peso * 20; // 20 mg/kg/dose de SMX
                let tetoAtingido = false;
                if (doseSmx > 800) {
                    doseSmx = 800;
                    tetoAtingido = true;
                }

                if (opcaoSel === 'comp_simples') {
                    return { doseMg: doseSmx, volumeTexto: '1 comprimido (400+80 mg)', tetoAtingido };
                } else if (opcaoSel === 'comp_forte') {
                    return { doseMg: doseSmx, volumeTexto: '1 comprimido Forte (800+160 mg)', tetoAtingido };
                } else {
                    const ml = doseSmx / 80;
                    return { doseMg: doseSmx, volumeTexto: `${ml.toFixed(1)} mL da susp. Forte`, tetoAtingido };
                }
            }
        },
        {
            id: 'metronidazol_susp',
            categoria: 'orais',
            categoriaNome: '4. Antibióticos Orais',
            nome: 'Metronidazol Suspensão Oral 40 mg/mL',
            apresentacao: '40 mg/mL (200 mg / 5 mL)',
            posologiaStd: '20 a 30 mg/kg/dia divididos em 3 doses (8/8h)',
            doseMgKg: 10,
            concentracaoMgMl: 40,
            tetoDoseMg: 500,
            tetoDiaMg: 1500,
            frequencia: 'de 8 em 8 horas por 7 a 10 dias',
            unidadeDosagem: 'mL',
            keywords: 'metronidazol flagyl suspensao giardia ameba anaerobio',
            doseAdulta: { doseMg: 400, vol: '10 mL (400 mg) 8/8h — evitar álcool; preferir comprimido' }
        },
        {
            id: 'clindamicina_comp',
            categoria: 'orais',
            categoriaNome: '4. Antibióticos Orais',
            nome: 'Clindamicina Comprimido / Cápsula 300 mg',
            apresentacao: 'Cápsula de 300 mg',
            posologiaStd: '20 a 40 mg/kg/dia divididos em 3 a 4 doses (6/6h ou 8/8h)',
            doseMgKg: 7.5,
            tetoDoseMg: 600,
            frequencia: 'de 6 em 6 horas por 7 a 10 dias',
            unidadeDosagem: 'cápsula',
            keywords: 'clindamicina dalacin capsula 300mg pele osso staphylococcus',
            calculoEspecial: (peso) => {
                const doseMgCalculada = peso * 7.5;
                let doseMg = doseMgCalculada;
                let caps = Math.max(1, Math.round(doseMgCalculada / 300));
                let tetoAtingido = false;
                if (caps > 2) {
                    caps = 2;
                    doseMg = 600;
                    tetoAtingido = true;
                } else {
                    doseMg = caps * 300;
                }
                return {
                    doseMg,
                    volumeTexto: `${caps} cápsula(s) de 300 mg (${doseMg} mg)`,
                    tetoAtingido
                };
            }
        },

        {
            id: 'claritromicina_125',
            categoria: 'orais',
            categoriaNome: '4. Antibióticos Orais',
            nome: 'Claritromicina Suspensão 125 mg/5 mL',
            apresentacao: 'Suspensão oral 125 mg/5 mL (25 mg/mL)',
            posologiaStd: '15 mg/kg/dia divididos de 12/12h (Máx: 500 mg/dose)',
            doseMgKg: 7.5,
            concentracaoMgMl: 25,
            tetoDoseMg: 500,
            frequencia: 'de 12 em 12 horas por 7 a 14 dias',
            unidadeDosagem: 'mL',
            keywords: 'claritromicina klaricid suspensao macrolidio pneumonia sinusite otite',
            doseAdulta: { doseMg: 500, vol: '20 mL da suspensão (500 mg) ou 1 comprimido de 500 mg' }
        },
        {
            id: 'claritromicina_250',
            categoria: 'orais',
            categoriaNome: '4. Antibióticos Orais',
            nome: 'Claritromicina Suspensão 250 mg/5 mL',
            apresentacao: 'Suspensão oral 250 mg/5 mL (50 mg/mL)',
            posologiaStd: '15 mg/kg/dia divididos de 12/12h (Máx: 500 mg/dose)',
            doseMgKg: 7.5,
            concentracaoMgMl: 50,
            tetoDoseMg: 500,
            frequencia: 'de 12 em 12 horas por 7 a 14 dias',
            unidadeDosagem: 'mL',
            keywords: 'claritromicina klaricid suspensao forte macrolidio pneumonia sinusite',
            doseAdulta: { doseMg: 500, vol: '10 mL da suspensão (500 mg) ou 1 comprimido de 500 mg' }
        },
        {
            id: 'claritromicina_comp',
            categoria: 'orais',
            categoriaNome: '4. Antibióticos Orais',
            nome: 'Claritromicina Comprimidos 250 mg / 500 mg',
            apresentacao: 'Comprimidos 250 mg e 500 mg',
            posologiaStd: '250 a 500 mg 12/12h (Crianças > 30 kg / Adolescentes e Adultos)',
            opcoes: [
                { id: 'clari_250', nome: 'Comprimido 250 mg (12/12h)', doseMg: 250 },
                { id: 'clari_500', nome: 'Comprimido 500 mg (12/12h)', doseMg: 500 }
            ],
            frequencia: 'de 12 em 12 horas por 7 a 14 dias',
            unidadeDosagem: 'comprimido',
            keywords: 'claritromicina comprimido 250mg 500mg macrolidio adulto adolescente',
            doseAdulta: { doseMg: 500, vol: '1 comprimido de 500 mg' },
            calculoEspecial: (peso, idadeNum, idadeUnidade, opcaoSel) => {
                const doseMg = opcaoSel === 'clari_500' ? 500 : 250;
                return { doseMg, volumeTexto: `1 comprimido de ${doseMg} mg`, tetoAtingido: false };
            }
        },
        {
            id: 'ciprofloxacino_comp',
            categoria: 'orais',
            categoriaNome: '4. Antibióticos Orais',
            nome: 'Ciprofloxacino Comprimido 500 mg',
            apresentacao: 'Comprimido 500 mg',
            posologiaStd: '500 mg 12/12h por 3 a 14 dias conforme o foco infeccioso (adulto)',
            frequencia: 'de 12 em 12 horas por 3 a 14 dias',
            unidadeDosagem: 'comprimido',
            modo: 'adulto',
            keywords: 'ciprofloxacino cipro quinolona itu infecao urinaria diarreia adulto',
            doseAdulta: { doseMg: 500, vol: '1 comprimido de 500 mg' }
        },
        {
            id: 'doxiciclina_comp',
            categoria: 'orais',
            categoriaNome: '4. Antibióticos Orais',
            nome: 'Doxiciclina Comprimido 100 mg',
            apresentacao: 'Comprimido 100 mg',
            posologiaStd: '100 mg 12/12h (copo cheio de água, não deitar por 30 min) — adulto',
            frequencia: 'de 12 em 12 horas, com copo cheio de água (não deitar por 30 minutos)',
            unidadeDosagem: 'comprimido',
            modo: 'adulto',
            keywords: 'doxiciclina vibramicina tetraciclina acne pneumonia atipica ist adulto',
            doseAdulta: { doseMg: 100, vol: '1 comprimido de 100 mg' }
        },
        {
            id: 'nitrofurantoina_caps',
            categoria: 'orais',
            categoriaNome: '4. Antibióticos Orais',
            nome: 'Nitrofurantoína Cápsula 100 mg',
            apresentacao: 'Cápsula 100 mg',
            posologiaStd: '100 mg 6/6h por 7 dias, junto às refeições (adulto — ITU)',
            frequencia: 'de 6 em 6 horas por 7 dias, junto às refeições',
            unidadeDosagem: 'capsula',
            modo: 'adulto',
            keywords: 'nitrofurantoina macrodantina itu cistite infecao urinaria adulto',
            doseAdulta: { doseMg: 100, vol: '1 cápsula de 100 mg' }
        },
        {
            id: 'metronidazol_comp',
            categoria: 'orais',
            categoriaNome: '4. Antibióticos Orais',
            nome: 'Metronidazol Comprimido 250 mg / 400 mg',
            apresentacao: 'Comprimido 250 mg e 400 mg',
            posologiaStd: '250 a 400 mg 8/8h por 7 a 10 dias — EVITAR ÁLCOOL (adulto)',
            opcoes: [
                { id: 'met_250', nome: 'Comprimido 250 mg (8/8h)', doseMg: 250 },
                { id: 'met_400', nome: 'Comprimido 400 mg (8/8h)', doseMg: 400 }
            ],
            frequencia: 'de 8 em 8 horas por 7 a 10 dias (evitar álcool durante o uso)',
            unidadeDosagem: 'comprimido',
            modo: 'adulto',
            keywords: 'metronidazol flagyl comprimido ameba giardia vaginose anaerobio adulto',
            calculoEspecial: (peso, idadeNum, idadeUnidade, opcaoSel) => {
                const doseMg = opcaoSel === 'met_400' ? 400 : 250;
                return { doseMg, volumeTexto: `1 comprimido de ${doseMg} mg`, tetoAtingido: false };
            }
        },
        // =====================================================================
        // 5. ANTIBIÓTICOS PARENTERAIS (EV / IM)
        // =====================================================================
        {
            id: 'ceftriaxona_ev',
            categoria: 'parenterais',
            categoriaNome: '5. Antibióticos Parenterais (EV/IM)',
            nome: 'Ceftriaxona Frasco-Ampola 500 mg / 1000 mg',
            apresentacao: 'Frasco-ampola 500 mg e 1000 mg (1g)',
            posologiaStd: 'Infecção Habitual: 50-75 mg/kg/dia (24/24h) | Meningite: 100 mg/kg/dia',
            opcoes: [
                { id: 'habitual', nome: 'Infecção Habitual (75 mg/kg/dia 24/24h)', doseMgKg: 75, teto: 2000, freq: 'uma vez ao dia por via EV ou IM' },
                { id: 'meningite', nome: 'Meningite / Infecção Grave (100 mg/kg/dia em 12/12h)', doseMgKg: 50, teto: 2000, freq: 'de 12 em 12 horas por via EV' }
            ],
            frequencia: 'uma vez ao dia por via EV ou IM',
            unidadeDosagem: 'mL',
            keywords: 'ceftriaxona rocefin frasco ampola ev im pneumo meningite hospitalar',
            calculoEspecial: (peso, idadeNum, idadeUnidade, opcaoSel) => {
                const isMen = opcaoSel === 'meningite';
                const mgKg = isMen ? 50 : 75;
                const teto = 2000;

                let doseMg = peso * mgKg;
                let tetoAtingido = false;
                if (doseMg > teto) {
                    doseMg = teto;
                    tetoAtingido = true;
                }
                const ml = doseMg / 100;
                return { doseMg, volumeTexto: `${doseMg.toFixed(0)} mg (~ ${ml.toFixed(1)} mL sol. 100mg/mL)`, tetoAtingido };
            }
        },
        {
            id: 'ampicilina_ev',
            categoria: 'parenterais',
            categoriaNome: '5. Antibióticos Parenterais (EV/IM)',
            nome: 'Ampicilina Frasco-Ampola 500 mg / 1000 mg',
            apresentacao: 'Frasco-ampola 500 mg e 1000 mg (EV/IM)',
            posologiaStd: '100 a 200 mg/kg/dia divididos em 4 doses (6/6h)',
            doseMgKg: 37.5,
            tetoDoseMg: 2000,
            frequencia: 'de 6 em 6 horas por via EV em 15-30 min',
            unidadeDosagem: 'mg',
            keywords: 'ampicilina frasco ampola ev im neonato listeria meningite',
            calculoEspecial: (peso) => {
                let doseMg = peso * 37.5;
                let tetoAtingido = false;
                if (doseMg > 2000) {
                    doseMg = 2000;
                    tetoAtingido = true;
                }
                const ml = doseMg / 100;
                return { doseMg, volumeTexto: `${doseMg.toFixed(0)} mg (~ ${ml.toFixed(1)} mL sol. 100mg/mL)`, tetoAtingido };
            }
        },
        {
            id: 'oxacilina_ev',
            categoria: 'parenterais',
            categoriaNome: '5. Antibióticos Parenterais (EV/IM)',
            nome: 'Oxacilina Frasco-Ampola 500 mg',
            apresentacao: 'Frasco-ampola 500 mg (EV)',
            posologiaStd: '100 a 200 mg/kg/dia divididos em 4 a 6 doses (6/6h ou 4/4h)',
            doseMgKg: 37.5,
            tetoDoseMg: 2000,
            frequencia: 'de 6 em 6 horas por via EV lenta',
            unidadeDosagem: 'mg',
            keywords: 'oxacilina staphylococcus aureus celulite osteomielite ev',
            calculoEspecial: (peso) => {
                let doseMg = peso * 37.5;
                let tetoAtingido = false;
                if (doseMg > 2000) {
                    doseMg = 2000;
                    tetoAtingido = true;
                }
                const ml = doseMg / 100;
                return { doseMg, volumeTexto: `${doseMg.toFixed(0)} mg (~ ${ml.toFixed(1)} mL sol. 100mg/mL)`, tetoAtingido };
            }
        },
        {
            id: 'cefuroxima_ev',
            categoria: 'parenterais',
            categoriaNome: '5. Antibióticos Parenterais (EV/IM)',
            nome: 'Cefuroxima Parenteral Frasco-Ampola 750 mg',
            apresentacao: 'Frasco-ampola 750 mg (EV/IM)',
            posologiaStd: '75 a 150 mg/kg/dia divididos em 3 doses (8/8h)',
            doseMgKg: 33.3,
            tetoDoseMg: 1500,
            frequencia: 'de 8 em 8 horas por via EV em 15-30 min',
            unidadeDosagem: 'mg',
            keywords: 'cefuroxima zinnat ampola ev im pneumonia grave hospitalar',
            calculoEspecial: (peso) => {
                let doseMg = peso * 33.3;
                let tetoAtingido = false;
                if (doseMg > 1500) {
                    doseMg = 1500;
                    tetoAtingido = true;
                }
                const ml = doseMg / 100;
                return { doseMg, volumeTexto: `${doseMg.toFixed(0)} mg (~ ${ml.toFixed(1)} mL sol. 100mg/mL)`, tetoAtingido };
            }
        },
        {
            id: 'cefalotina_ev',
            categoria: 'parenterais',
            categoriaNome: '5. Antibióticos Parenterais (EV/IM)',
            nome: 'Cefalotina Frasco-Ampola 1000 mg (1g)',
            apresentacao: 'Frasco-ampola 1g (EV/IM)',
            posologiaStd: '80 a 160 mg/kg/dia divididos em 4 doses (6/6h)',
            doseMgKg: 25,
            tetoDoseMg: 2000,
            frequencia: 'de 6 em 6 horas por via EV',
            unidadeDosagem: 'mg',
            keywords: 'cefalotina keflin ampola ev im cirurgia profilaxia',
            calculoEspecial: (peso) => {
                let doseMg = peso * 25;
                let tetoAtingido = false;
                if (doseMg > 2000) {
                    doseMg = 2000;
                    tetoAtingido = true;
                }
                const ml = doseMg / 100;
                return { doseMg, volumeTexto: `${doseMg.toFixed(0)} mg (~ ${ml.toFixed(1)} mL sol. 100mg/mL)`, tetoAtingido };
            }
        },
        {
            id: 'cefepima_ev',
            categoria: 'parenterais',
            categoriaNome: '5. Antibióticos Parenterais (EV/IM)',
            nome: 'Cefepima Frasco-Ampola 1000 mg / 2000 mg',
            apresentacao: 'Frasco-ampola 1 g e 2 g (uso EV)',
            posologiaStd: '100 a 150 mg/kg/dia divididos 8/8h (neutropenia febril / infecções graves)',
            doseMgKg: 50,
            tetoDoseMg: 2000,
            frequencia: 'de 8 em 8 horas por via EV (infusão em 30 minutos)',
            unidadeDosagem: 'mg',
            keywords: 'cefepima maxipime ev hospitalar neutropenia febril pseudomonas urosepsis 4 geracao',
            doseAdulta: { doseMg: 2000, vol: '2 g EV 8/8h (diluir conforme protocolo institucional)' }
        },
        {
            id: 'clindamicina_ampola',
            categoria: 'parenterais',
            categoriaNome: '5. Antibióticos Parenterais (EV/IM)',
            nome: 'Clindamicina Ampola EV/IM 150 mg/mL',
            apresentacao: '150 mg/mL (Ampola de 4 mL = 600 mg)',
            posologiaStd: '20 a 40 mg/kg/dia divididos em 3 a 4 doses (6/6h ou 8/8h)',
            doseMgKg: 10,
            concentracaoMgMl: 150,
            tetoDoseMg: 600,
            tetoDiaMg: 2400,
            frequencia: 'de 6 em 6 horas por via EV infusão em 30 min',
            unidadeDosagem: 'mL',
            keywords: 'clindamicina dalacin ampola ev im anaerobio abscesso'
        },
        {
            id: 'vancomicina_ev',
            categoria: 'parenterais',
            categoriaNome: '5. Antibióticos Parenterais (EV/IM)',
            nome: 'Vancomicina Frasco-Ampola 500 mg',
            apresentacao: 'Frasco-ampola 500 mg (EV)',
            posologiaStd: '40 a 60 mg/kg/dia divididos em 4 doses (6/6h em infusão de 60 min)',
            doseMgKg: 12.5,
            tetoDoseMg: 1000,
            frequencia: 'de 6 em 6 horas por via EV infusão lenta (60 min)',
            unidadeDosagem: 'mg',
            keywords: 'vancomicina ampola ev mrsa sepse infeccao grave uti',
            calculoEspecial: (peso) => {
                let doseMg = peso * 12.5;
                let tetoAtingido = false;
                if (doseMg > 1000) {
                    doseMg = 1000;
                    tetoAtingido = true;
                }
                const ml = doseMg / 5;
                return { doseMg, volumeTexto: `${doseMg.toFixed(0)} mg (${ml.toFixed(0)} mL sol. diluída 5mg/mL)`, tetoAtingido };
            }
        },
        {
            id: 'gentamicina_ampola',
            categoria: 'parenterais',
            categoriaNome: '5. Antibióticos Parenterais (EV/IM)',
            nome: 'Gentamicina Ampolas (20 mg/mL, 40 mg/mL e 80 mg/2 mL)',
            apresentacao: 'Ampolas de 20 mg/mL, 40 mg/mL e 80 mg/2 mL (40 mg/mL)',
            posologiaStd: '5 a 7,5 mg/kg/dia em dose única diária (24/24h)',
            doseMgKg: 5,
            concentracaoMgMl: 40,
            tetoDoseMg: 240,
            tetoDiaMg: 240,
            frequencia: 'uma vez ao dia por via EV (infusão 30 min) ou IM',
            unidadeDosagem: 'mL',
            keywords: 'gentamicina garamicina ampola ev im gram negativo utiitu'
        },
        {
            id: 'amicacina_ampola',
            categoria: 'parenterais',
            categoriaNome: '5. Antibióticos Parenterais (EV/IM)',
            nome: 'Amicacina Ampolas (100 mg, 250 mg e 500 mg)',
            apresentacao: 'Ampolas de 100 mg / 2 mL, 250 mg / 2 mL e 500 mg / 2 mL',
            posologiaStd: '15 a 22,5 mg/kg/dia em dose única diária (24/24h)',
            doseMgKg: 15,
            concentracaoMgMl: 250,
            tetoDoseMg: 1500,
            tetoDiaMg: 1500,
            frequencia: 'uma vez ao dia por via EV ou IM',
            unidadeDosagem: 'mL',
            keywords: 'amicacina novamin ampola ev im gram negativo pseudomonas'
        },
        {
            id: 'metronidazol_ev',
            categoria: 'parenterais',
            categoriaNome: '5. Antibióticos Parenterais (EV/IM)',
            nome: 'Metronidazol Bolsa EV 5 mg/mL',
            apresentacao: '5 mg/mL (Bolsa de 100 mL = 500 mg)',
            posologiaStd: '30 mg/kg/dia divididos em 3 doses (8/8h em infusão de 30-60 min)',
            doseMgKg: 10,
            concentracaoMgMl: 5,
            tetoDoseMg: 500,
            tetoDiaMg: 1500,
            frequencia: 'de 8 em 8 horas por via EV infusão em 30 a 60 min',
            unidadeDosagem: 'mL',
            keywords: 'metronidazol flagyl bolsa ev peritonite anaerobio'
        },

        // =====================================================================
        // 6. ADRENALINA, SUPLEMENTAÇÃO E PROFILAXIA
        // =====================================================================
        {
            id: 'adrenalina_ampola',
            categoria: 'suplementos',
            categoriaNome: '6. Adrenalina, Suplementação e Profilaxia',
            nome: 'Adrenalina / Epinefrina Ampola 1 mg/mL',
            apresentacao: '1 mg/mL (1:1.000 pura)',
            posologiaStd: 'Anafilaxia IM (1:1.000) | PCR EV/IO (1:10.000) | Crupe Nebulização',
            opcoes: [
                { id: 'anafilaxia', nome: 'Anafilaxia (IM 1:1.000 pura 0,01 mg/kg)', doseMgKg: 0.01, teto: 0.3, freq: 'via IM na face anterolateral da coxa' },
                { id: 'pcr', nome: 'PCR / Parada (EV/IO 1:10.000 0,1 mL/kg)', doseMgKg: 0.01, teto: 1, freq: 'via EV/IO rápida a cada 3-5 min' },
                { id: 'crupe', nome: 'Crupe Nebulização (1:1.000 pura 0,5 mL/kg)', doseMgKg: 0.5, teto: 5, freq: 'via nebulização pura com SF 0,9%' }
            ],
            frequencia: 'via IM na face anterolateral da coxa',
            unidadeDosagem: 'mL',
            keywords: 'adrenalina epinefrina anafilaxia choque anafilático pcr parada crupe nebulizacao',
            calculoEspecial: (peso, idadeNum, idadeUnidade, opcaoSel) => {
                if (opcaoSel === 'pcr') {
                    let doseMg = peso * 0.01;
                    let tetoAtingido = false;
                    if (doseMg > 1) {
                        doseMg = 1;
                        tetoAtingido = true;
                    }
                    const ml1_10000 = doseMg / 0.1;
                    return {
                        doseMg,
                        volumeTexto: `${ml1_10000.toFixed(1)} mL da sol. DILUÍDA 1:10.000 (1mL Adrenalina + 9mL SF)`,
                        tetoAtingido
                    };
                } else if (opcaoSel === 'crupe') {
                    let ml = peso * 0.5;
                    let tetoAtingido = false;
                    if (ml < 2) ml = 2;
                    if (ml > 5) {
                        ml = 5;
                        tetoAtingido = true;
                    }
                    return {
                        doseMg: ml * 1,
                        volumeTexto: `${ml.toFixed(1)} mL de Adrenalina 1:1.000 pura em nebulização`,
                        tetoAtingido
                    };
                } else {
                    let doseMg = peso * 0.01;
                    let tetoAtingido = false;
                    let tetoMax = peso >= 35 ? 0.5 : 0.3;
                    if (doseMg > tetoMax) {
                        doseMg = tetoMax;
                        tetoAtingido = true;
                    }
                    const ml = doseMg / 1;
                    return {
                        doseMg,
                        volumeTexto: `${ml.toFixed(2)} mL de Adrenalina 1:1.000 pura IM`,
                        tetoAtingido
                    };
                }
            }
        },
        {
            id: 'vitamina_d',
            categoria: 'suplementos',
            categoriaNome: '6. Adrenalina, Suplementação e Profilaxia',
            nome: 'Vitamina D (Diretrizes SBP)',
            apresentacao: 'Solução Gotas (200 UI / gota ou 400 UI / gota)',
            posologiaStd: 'Termo: 400 UI/dia (1º ano) / 600 UI/dia (2º ano) | Prematuro: 400 a 800 UI/dia',
            opcoes: [
                { id: 'termo_1ano', nome: 'RN a Termo (400 UI/dia até 12 meses)', ui: 400, freq: 'uma vez ao dia' },
                { id: 'termo_2ano', nome: 'RN a Termo (600 UI/dia dos 12 aos 24m)', ui: 600, freq: 'uma vez ao dia' },
                { id: 'prematuro', nome: 'RN Prematuro <1500g (400 a 800 UI/dia)', ui: 800, freq: 'uma vez ao dia' }
            ],
            frequencia: 'uma vez ao dia',
            unidadeDosagem: 'gotas',
            keywords: 'vitamina d colecalciferol raquitismo suplemento sbp recem nascido',
            calculoEspecial: (peso, idadeNum, idadeUnidade, opcaoSel) => {
                let ui = 400;
                if (opcaoSel === 'termo_2ano') ui = 600;
                if (opcaoSel === 'prematuro') ui = 800;

                const gotas200 = Math.round(ui / 200);
                const gotas400 = Math.round(ui / 400);

                return {
                    doseMg: ui,
                    volumeTexto: `${gotas200} gotas/dia (se frasco 200 UI/gota) OU ${gotas400} gota(s)/dia (se 400 UI/gota)`,
                    tetoAtingido: false
                };
            }
        },
        {
            id: 'ferro_elementar',
            categoria: 'suplementos',
            categoriaNome: '6. Adrenalina, Suplementação e Profilaxia',
            nome: 'Ferro Elementar Gotas (Suplementação / Tratamento)',
            apresentacao: 'Solução 25 mg/mL de Ferro Elementar (1 mL = 20 gotas | 1 gota = 1,25 mg)',
            posologiaStd: 'Profilaxia SBP: 1 a 4 mg/kg/dia | Tratamento Anemia Ferropriva: 3 a 6 mg/kg/dia',
            opcoes: [
                { id: 'termo_aig', nome: 'Profilaxia: RN Termo AIG (1 mg/kg/dia a partir dos 6m)', mgKg: 1 },
                { id: 'termo_pbp', nome: 'Profilaxia: RN Termo Baixo Peso <2500g (2 mg/kg/dia a partir de 30d)', mgKg: 2 },
                { id: 'prem_1500', nome: 'Profilaxia: Prematuro 1000g a 1500g (3 mg/kg/dia a partir de 30d)', mgKg: 3 },
                { id: 'prem_1000', nome: 'Profilaxia: Prematuro <1000g (4 mg/kg/dia a partir de 30d)', mgKg: 4 },
                { id: 'tratamento', nome: 'Tratamento: Anemia Ferropriva Confirmada (4 mg/kg/dia)', mgKg: 4 }
            ],
            frequencia: 'uma vez ao dia (ou divididos em 2 tomadas) longe das refeições ou com suco cítrico',
            unidadeDosagem: 'gotas',
            keywords: 'ferro elementar sulfato ferroso neutrofer profilaxia anemia sbp',
            calculoEspecial: (peso, idadeNum, idadeUnidade, opcaoSel) => {
                let mgKg = 1;
                if (opcaoSel === 'termo_pbp') mgKg = 2;
                if (opcaoSel === 'prem_1500') mgKg = 3;
                if (opcaoSel === 'prem_1000') mgKg = 4;
                if (opcaoSel === 'tratamento') mgKg = 4;

                let doseMg = peso * mgKg;
                let tetoAtingido = false;

                if (opcaoSel === 'tratamento' && doseMg > 60) {
                    doseMg = 60;
                    tetoAtingido = true;
                }

                const gotas = Math.round(doseMg / 1.25);
                const ml = doseMg / 25;

                return {
                    doseMg,
                    volumeTexto: `${gotas} gotas/dia (${ml.toFixed(1)} mL da sol. 25mg/mL de Fe)`,
                    tetoAtingido
                };
            }
        },
        {
            id: 'polivitaminico_gotas',
            categoria: 'suplementos',
            categoriaNome: '6. Adrenalina, Suplementação e Profilaxia',
            nome: 'Polivitamínico Gotas (Lactentes e Crianças)',
            apresentacao: 'Solução oral em gotas (frascos de 15 a 20 mL)',
            posologiaStd: 'Lactentes 0-11m: 0,4 mL/dia (~12 gotas) | 1-10 anos: 0,6 mL/dia (~18 gotas) — SBP',
            opcoes: [
                { id: 'pv_lactente', nome: 'Lactente 0-11 meses (0,4 mL/dia ≈ 12 gotas)', vol: '12 gotas (0,4 mL)' },
                { id: 'pv_crianca', nome: 'Criança 1-10 anos (0,6 mL/dia ≈ 18 gotas)', vol: '18 gotas (0,6 mL)' }
            ],
            frequencia: 'uma vez ao dia, preferencialmente junto a uma refeição',
            unidadeDosagem: 'fixa',
            keywords: 'polivitaminico complexo vitaminico suplemento vitaminas desnutricao prematuro',
            calculoEspecial: (peso, idadeNum, idadeUnidade, opcaoSel) => {
                const vol = opcaoSel === 'pv_crianca' ? '18 gotas (0,6 mL)' : '12 gotas (0,4 mL)';
                return { doseMg: 0, volumeTexto: `${vol} por dia`, tetoAtingido: false };
            }
        },

        // =====================================================================
        // 7. ANTIFÚNGICOS E TÓPICOS
        // =====================================================================
        {
            id: 'nistatina_susp',
            categoria: 'antifungicos',
            categoriaNome: '7. Antifúngicos e Tópicos',
            nome: 'Nistatina Suspensão Oral 100.000 UI/mL',
            apresentacao: 'Suspensão oral 100.000 UI/mL (candidíase oral — "sapinho")',
            posologiaStd: 'Ped: 1 a 2 mL 4x/dia | Adulto: 1 a 6 mL 4x/dia (bochechar e engolir)',
            frequencia: '4 vezes ao dia, após as mamadas/refeições (manter na boca antes de engolir)',
            unidadeDosagem: 'fixa',
            modo: 'ambos',
            keywords: 'nistatina suspensao oral sapinho candidiase oral micose boca candida',
            doseAdulta: { doseMg: 0, vol: '1 a 6 mL (100.000 a 600.000 UI) 4x/dia — bochechar e engolir' },
            calculoEspecial: () => ({ doseMg: 0, volumeTexto: '1 a 2 mL (100.000 a 200.000 UI) 4x/dia, nos cantos da boca ou com gaze na mucosa', tetoAtingido: false })
        },
        {
            id: 'nistatina_oxido_zinco',
            categoria: 'antifungicos',
            categoriaNome: '7. Antifúngicos e Tópicos',
            nome: 'Nistatina + Óxido de Zinco Pomada',
            apresentacao: 'Pomada dermatológica (assaduras / dermatite de fraldas)',
            posologiaStd: 'Aplicar camada generosa a cada troca de fralda, 2 a 6x/dia (RN em diante)',
            frequencia: 'a cada troca de fralda ou após higienização, 2 a 6 vezes ao dia',
            unidadeDosagem: 'fixa',
            modo: 'ambos',
            keywords: 'nistatina oxido zinco pomada assadura fralda dermatite bebe hipoglos',
            doseAdulta: { doseMg: 0, vol: 'Aplicar camada generosa na área afetada 2 a 6x/dia' },
            calculoEspecial: () => ({ doseMg: 0, volumeTexto: 'Aplicar camada generosa a cada troca de fralda (2 a 6x/dia)', tetoAtingido: false })
        },
        {
            id: 'nistatina_creme_vaginal',
            categoria: 'antifungicos',
            categoriaNome: '7. Antifúngicos e Tópicos',
            nome: 'Nistatina Creme Vaginal 25.000 UI/g',
            apresentacao: 'Creme vaginal 25.000 UI/g com aplicador',
            posologiaStd: '1 aplicador cheio (100.000 UI) à noite por 14 dias (adulto)',
            frequencia: '1 aplicador cheio via vaginal ao deitar, por 14 dias consecutivos',
            unidadeDosagem: 'fixa',
            modo: 'adulto',
            keywords: 'nistatina creme vaginal candidiase vaginose ginecologico adulto',
            doseAdulta: { doseMg: 0, vol: '1 aplicador cheio (100.000 UI) via vaginal' }
        },
        {
            id: 'miconazol_topico',
            categoria: 'antifungicos',
            categoriaNome: '7. Antifúngicos e Tópicos',
            nome: 'Miconazol Creme 2% / Gel Oral 20 mg/g',
            apresentacao: 'Creme dermatológico 2% | Creme vaginal 2% | Gel oral 20 mg/g',
            posologiaStd: 'Creme: 2x/dia por 2 a 4 semanas | Gel oral (sapinho, > 6 meses): 2,5 mL 4x/dia',
            opcoes: [
                { id: 'mic_gel', nome: 'Gel oral — Sapinho (> 6 meses): 2,5 mL 4x/dia', vol: 'Aplicar 1/2 colher-medida (2,5 mL) na mucosa oral 4x/dia após refeições' },
                { id: 'mic_creme', nome: 'Creme dermatológico 2%: 2x/dia por 2 a 4 semanas', vol: 'Aplicar na área afetada 2x/dia por 2 a 4 semanas' },
                { id: 'mic_vaginal', nome: 'Creme vaginal 2% (adulto): ao deitar por 7 a 14 dias', vol: '1 aplicador cheio ao deitar por 7 a 14 dias' }
            ],
            frequencia: 'conforme a forma farmacêutica selecionada',
            unidadeDosagem: 'fixa',
            modo: 'ambos',
            keywords: 'miconazol creme gel oral sapinho micose frieira candidiase vaginal daktarin',
            calculoEspecial: (peso, idadeNum, idadeUnidade, opcaoSel) => {
                const op = { mic_gel: 'Aplicar 1/2 colher-medida (2,5 mL) na mucosa oral 4x/dia após refeições',
                             mic_creme: 'Aplicar na área afetada 2x/dia por 2 a 4 semanas',
                             mic_vaginal: '1 aplicador cheio ao deitar por 7 a 14 dias' };
                return { doseMg: 0, volumeTexto: op[opcaoSel] || op.mic_creme, tetoAtingido: false };
            }
        },
        {
            id: 'clotrimazol_creme',
            categoria: 'antifungicos',
            categoriaNome: '7. Antifúngicos e Tópicos',
            nome: 'Clotrimazol Creme 1% (Dermatológico / Vaginal)',
            apresentacao: 'Creme dermatológico 1% | Creme vaginal 1% e 2%',
            posologiaStd: 'Dermatológico: 2 a 3x/dia por 2 a 4 semanas | Vaginal: ao deitar por 6 dias',
            opcoes: [
                { id: 'clot_derm', nome: 'Creme dermatológico 1%: 2 a 3x/dia por 2 a 4 semanas', vol: 'Aplicar na área afetada 2 a 3x/dia por 2 a 4 semanas' },
                { id: 'clot_vag', nome: 'Creme vaginal 1% (adulto): ao deitar por 6 dias', vol: '1 aplicador ao deitar por 6 dias consecutivos' }
            ],
            frequencia: 'conforme a forma farmacêutica selecionada',
            unidadeDosagem: 'fixa',
            modo: 'ambos',
            keywords: 'clotrimazol canesten creme micose pano branco candidiase vaginal antifungico',
            calculoEspecial: (peso, idadeNum, idadeUnidade, opcaoSel) => {
                const vol = opcaoSel === 'clot_vag' ? '1 aplicador ao deitar por 6 dias consecutivos' : 'Aplicar na área afetada 2 a 3x/dia por 2 a 4 semanas';
                return { doseMg: 0, volumeTexto: vol, tetoAtingido: false };
            }
        },
        {
            id: 'ketoconazol_topico',
            categoria: 'antifungicos',
            categoriaNome: '7. Antifúngicos e Tópicos',
            nome: 'Ketoconazol Creme 2% / Xampu 2%',
            apresentacao: 'Creme dermatológico 2% | Xampu 2%',
            posologiaStd: 'Creme: 1 a 2x/dia por 2 a 4 semanas | Xampu: 2x/semana por 2 a 4 semanas',
            opcoes: [
                { id: 'ket_creme', nome: 'Creme 2%: 1 a 2x/dia por 2 a 4 semanas', vol: 'Aplicar na área afetada 1 a 2x/dia por 2 a 4 semanas' },
                { id: 'ket_xampu', nome: 'Xampu 2%: 2x/semana por 2 a 4 semanas', vol: 'Aplicar no couro cabeludo/corpo 2x por semana, deixar agir 3 a 5 min e enxaguar, por 2 a 4 semanas' }
            ],
            frequencia: 'conforme a forma farmacêutica selecionada',
            unidadeDosagem: 'fixa',
            modo: 'ambos',
            keywords: 'ketoconazol cetoconazol creme xampu dermatite seborreica pano branco pitiriase nizoral',
            calculoEspecial: (peso, idadeNum, idadeUnidade, opcaoSel) => {
                const vol = opcaoSel === 'ket_xampu' ? 'Aplicar no couro cabeludo/corpo 2x/semana (agir 3 a 5 min e enxaguar) por 2 a 4 semanas' : 'Aplicar na área afetada 1 a 2x/dia por 2 a 4 semanas';
                return { doseMg: 0, volumeTexto: vol, tetoAtingido: false };
            }
        },
        {
            id: 'terbinafina_creme',
            categoria: 'antifungicos',
            categoriaNome: '7. Antifúngicos e Tópicos',
            nome: 'Terbinafina Creme 1% / Spray',
            apresentacao: 'Creme 1% | Solução spray',
            posologiaStd: 'Aplicar 1 a 2x/dia por 1 a 2 semanas (adulto e > 12 anos — frieira/tineas)',
            frequencia: '1 a 2 vezes ao dia, na área limpa e seca, por 1 a 2 semanas',
            unidadeDosagem: 'fixa',
            modo: 'adulto',
            keywords: 'terbinafina lamisil creme spray frieira tinea pedis micose pe',
            doseAdulta: { doseMg: 0, vol: 'Aplicar na área limpa e seca 1 a 2x/dia por 1 a 2 semanas' }
        },
        {
            id: 'terbinafina_comp',
            categoria: 'antifungicos',
            categoriaNome: '7. Antifúngicos e Tópicos',
            nome: 'Terbinafina Comprimido 250 mg',
            apresentacao: 'Comprimido 250 mg',
            posologiaStd: 'Adulto: 250 mg/dia | Ped (> 2 anos/> 10 kg): 10-20 kg: 62,5 mg | 20-40 kg: 125 mg | > 40 kg: 250 mg',
            frequencia: 'uma vez ao dia por 2 a 6 semanas (onicomicose: até 12 semanas)',
            unidadeDosagem: 'comprimido',
            modo: 'ambos',
            keywords: 'terbinafina lamisil comprimido onicomicose tinea capitis micose unha',
            doseAdulta: { doseMg: 250, vol: '1 comprimido de 250 mg/dia' },
            calculoEspecial: (peso) => {
                let doseMg = 250;
                if (peso < 20) doseMg = 62.5;
                else if (peso <= 40) doseMg = 125;
                return { doseMg, volumeTexto: `${doseMg} mg/dia VO (comprimido de 250 mg fracionado ou manipulado)`, tetoAtingido: peso > 40 };
            }
        },
        {
            id: 'fluconazol',
            categoria: 'antifungicos',
            categoriaNome: '7. Antifúngicos e Tópicos',
            nome: 'Fluconazol Cápsula 150 mg / Suspensão',
            apresentacao: 'Cápsula 150 mg | Suspensão oral (uso pediátrico)',
            posologiaStd: 'Adulto: 150 mg dose única (candidíase vaginal) ou 150 mg 1x/semana (tineas) | Ped: 3 a 6 mg/kg/dia',
            opcoes: [
                { id: 'fl_vaginal', nome: 'Candidíase vaginal (adulto): 150 mg dose única', vol: '1 cápsula de 150 mg, dose única', freq: 'dose única' },
                { id: 'fl_tinea', nome: 'Tineas (adulto): 150 mg 1x/semana por 2 a 6 semanas', vol: '1 cápsula de 150 mg', freq: 'uma vez por semana, por 2 a 6 semanas' },
                { id: 'fl_ped', nome: 'Pediatria: 6 mg/kg/dia (suspensão/manipulado)', freq: 'uma vez ao dia' }
            ],
            frequencia: 'conforme regime selecionado',
            unidadeDosagem: 'capsula',
            modo: 'ambos',
            keywords: 'fluconazol zoltec candidiase vaginal tinea micose sistemico antifungico',
            calculoEspecial: (peso, idadeNum, idadeUnidade, opcaoSel) => {
                if (opcaoSel === 'fl_vaginal') return { doseMg: 150, volumeTexto: '1 cápsula de 150 mg, dose única', tetoAtingido: false };
                if (opcaoSel === 'fl_tinea') return { doseMg: 150, volumeTexto: '1 cápsula de 150 mg', tetoAtingido: false };
                let doseMg = peso * 6;
                let tetoAtingido = false;
                if (doseMg > 150) { doseMg = 150; tetoAtingido = true; }
                return { doseMg, volumeTexto: `${doseMg.toFixed(0)} mg VO 1x/dia (suspensão ou manipulado)`, tetoAtingido };
            }
        },
        {
            id: 'griseofulvina',
            categoria: 'antifungicos',
            categoriaNome: '7. Antifúngicos e Tópicos',
            nome: 'Griseofulvina Comprimido 500 mg / Suspensão',
            apresentacao: 'Comprimido 500 mg | Suspensão oral',
            posologiaStd: 'Tinea capitis — Ped (>= 2 anos): 10 a 20 mg/kg/dia com refeição gordurosa | Adulto: 500 a 1.000 mg/dia',
            frequencia: 'uma vez ao dia (ou fracionado), junto a refeição gordurosa (leite integral/iogurte), por 4 a 8 semanas',
            unidadeDosagem: 'mg',
            modo: 'ambos',
            keywords: 'griseofulvina tinea capitis micose couro cabeludo antifungico crianca',
            doseAdulta: { doseMg: 500, vol: '500 mg a 1.000 mg/dia junto às refeições' },
            calculoEspecial: (peso) => {
                let doseMg = peso * 15;
                let tetoAtingido = false;
                if (doseMg > 1000) { doseMg = 1000; tetoAtingido = true; }
                return { doseMg, volumeTexto: `${doseMg.toFixed(0)} mg/dia VO junto a refeição gordurosa, por 4 a 8 semanas`, tetoAtingido };
            }
        },
        {
            id: 'itraconazol_caps',
            categoria: 'antifungicos',
            categoriaNome: '7. Antifúngicos e Tópicos',
            nome: 'Itraconazol Cápsula 100 mg',
            apresentacao: 'Cápsula 100 mg',
            posologiaStd: '100 a 200 mg/dia por 7 a 30 dias, imediatamente após refeições (adulto)',
            frequencia: 'uma vez ao dia, imediatamente após refeição, por 7 a 30 dias',
            unidadeDosagem: 'capsula',
            modo: 'adulto',
            keywords: 'itraconazol sporanox antifungico onicomicose micose sistemico adulto',
            doseAdulta: { doseMg: 100, vol: '1 a 2 cápsulas de 100 mg (100 a 200 mg/dia)' }
        },
        {
            id: 'neomicina_bacitracina',
            categoria: 'antifungicos',
            categoriaNome: '7. Antifúngicos e Tópicos',
            nome: 'Neomicina + Bacitracina Pomada',
            apresentacao: 'Pomada dermatológica (antibiótico tópico)',
            posologiaStd: 'Impetigo, feridas infectadas: aplicar 2 a 5x/dia por 5 a 10 dias (adulto e pediatria)',
            frequencia: '2 a 5 vezes ao dia, após limpeza do local, por 5 a 10 dias',
            unidadeDosagem: 'fixa',
            modo: 'ambos',
            keywords: 'neomicina bacitracina pomada antibiotico topico impetigo ferida nebacetin',
            doseAdulta: { doseMg: 0, vol: 'Aplicar na lesão 2 a 5x/dia por 5 a 10 dias' },
            calculoEspecial: () => ({ doseMg: 0, volumeTexto: 'Aplicar na lesão 2 a 5x/dia por 5 a 10 dias', tetoAtingido: false })
        },
        {
            id: 'sulfadiazina_prata',
            categoria: 'antifungicos',
            categoriaNome: '7. Antifúngicos e Tópicos',
            nome: 'Sulfadiazina de Prata Creme 1%',
            apresentacao: 'Creme 1% (queimaduras e feridas superficiais, > 2 meses)',
            posologiaStd: 'Aplicar camada de 1,5 mm 1 a 2x/dia, com curativo oclusivo ou aberto',
            frequencia: '1 a 2 vezes ao dia, até cicatrização da lesão',
            unidadeDosagem: 'fixa',
            modo: 'ambos',
            keywords: 'sulfadiazina prata creme queimadura ferida cicatrizante antimicrobiano',
            doseAdulta: { doseMg: 0, vol: 'Aplicar camada de ~1,5 mm 1 a 2x/dia' },
            calculoEspecial: () => ({ doseMg: 0, volumeTexto: 'Aplicar camada de ~1,5 mm 1 a 2x/dia (não usar < 2 meses)', tetoAtingido: false })
        },
        {
            id: 'corticoide_topico',
            categoria: 'antifungicos',
            categoriaNome: '7. Antifúngicos e Tópicos',
            nome: 'Hidrocortisona / Dexametasona Creme 0,1%',
            apresentacao: 'Creme dermatológico 0,1% (corticoide tópico)',
            posologiaStd: 'Dermatites, picadas, eczema: fina camada 1 a 2x/dia por no máximo 5 a 7 dias',
            frequencia: '1 a 2 vezes ao dia, em fina camada, por no máximo 5 a 7 dias',
            unidadeDosagem: 'fixa',
            modo: 'ambos',
            keywords: 'hidrocortisona dexametasona creme topico corticoide dermatite eczema picada',
            doseAdulta: { doseMg: 0, vol: 'Aplicar fina camada 1 a 2x/dia por no máx. 5 a 7 dias' },
            calculoEspecial: () => ({ doseMg: 0, volumeTexto: 'Aplicar fina camada 1 a 2x/dia por no máx. 5 a 7 dias (cautela em pediatria)', tetoAtingido: false })
        },

        // =====================================================================
        // 8. CARDIOVASCULARES E ANTI-HIPERTENSIVOS (ADULTO)
        // =====================================================================
        {
            id: 'enalapril_comp',
            categoria: 'cardiovasculares',
            categoriaNome: '8. Cardiovasculares e Anti-hipertensivos',
            nome: 'Enalapril Comprimido 10 mg / 20 mg',
            apresentacao: 'Comprimido 10 mg e 20 mg (maleato)',
            posologiaStd: '5 a 40 mg/dia, em 1 ou 2 tomadas (adulto — HAS/IC)',
            opcoes: [
                { id: 'ena_10', nome: 'Comprimido 10 mg', doseMg: 10 },
                { id: 'ena_20', nome: 'Comprimido 20 mg', doseMg: 20 }
            ],
            frequencia: 'uma vez ao dia (ou dividido em 2 tomadas)',
            unidadeDosagem: 'comprimido',
            modo: 'adulto',
            keywords: 'enalapril maleato ieca hipertensao pressao alta coracao adulto',
            calculoEspecial: (peso, idadeNum, idadeUnidade, opcaoSel) => {
                const doseMg = opcaoSel === 'ena_20' ? 20 : 10;
                return { doseMg, volumeTexto: `1 comprimido de ${doseMg} mg`, tetoAtingido: false };
            }
        },
        {
            id: 'losartana_comp',
            categoria: 'cardiovasculares',
            categoriaNome: '8. Cardiovasculares e Anti-hipertensivos',
            nome: 'Losartana Potássica Comprimido 50 mg',
            apresentacao: 'Comprimido 50 mg',
            posologiaStd: '50 a 100 mg/dia, em 1 ou 2 tomadas (adulto — HAS)',
            frequencia: 'uma vez ao dia (ou dividido em 2 tomadas)',
            unidadeDosagem: 'comprimido',
            modo: 'adulto',
            keywords: 'losartana cozaar bra hipertensao pressao alta adulto',
            doseAdulta: { doseMg: 50, vol: '1 comprimido de 50 mg (pode titular até 100 mg/dia)' }
        },
        {
            id: 'atenolol_comp',
            categoria: 'cardiovasculares',
            categoriaNome: '8. Cardiovasculares e Anti-hipertensivos',
            nome: 'Atenolol Comprimido 50 mg',
            apresentacao: 'Comprimido 50 mg',
            posologiaStd: '50 a 100 mg/dia em dose única (adulto — HAS/angina)',
            frequencia: 'uma vez ao dia',
            unidadeDosagem: 'comprimido',
            modo: 'adulto',
            keywords: 'atenolol betabloqueador hipertensao angina arritmia adulto',
            doseAdulta: { doseMg: 50, vol: '1 comprimido de 50 mg (pode titular até 100 mg/dia)' }
        },
        {
            id: 'anlodipino_comp',
            categoria: 'cardiovasculares',
            categoriaNome: '8. Cardiovasculares e Anti-hipertensivos',
            nome: 'Anlodipino Comprimido 5 mg / 10 mg',
            apresentacao: 'Comprimido 5 mg e 10 mg (besilato)',
            posologiaStd: '5 a 10 mg/dia em dose única (adulto — HAS)',
            opcoes: [
                { id: 'anlo_5', nome: 'Comprimido 5 mg', doseMg: 5 },
                { id: 'anlo_10', nome: 'Comprimido 10 mg', doseMg: 10 }
            ],
            frequencia: 'uma vez ao dia',
            unidadeDosagem: 'comprimido',
            modo: 'adulto',
            keywords: 'anlodipino norvasc bcc hipertensao pressao alta adulto',
            calculoEspecial: (peso, idadeNum, idadeUnidade, opcaoSel) => {
                const doseMg = opcaoSel === 'anlo_10' ? 10 : 5;
                return { doseMg, volumeTexto: `1 comprimido de ${doseMg} mg`, tetoAtingido: false };
            }
        },
        {
            id: 'hidroclorotiazida_comp',
            categoria: 'cardiovasculares',
            categoriaNome: '8. Cardiovasculares e Anti-hipertensivos',
            nome: 'Hidroclorotiazida Comprimido 25 mg',
            apresentacao: 'Comprimido 25 mg',
            posologiaStd: '12,5 a 25 mg/dia, preferencialmente pela manhã (adulto — HAS/edema)',
            opcoes: [
                { id: 'hctz_125', nome: '1/2 comprimido (12,5 mg/dia)', doseMg: 12.5 },
                { id: 'hctz_25', nome: 'Comprimido 25 mg/dia', doseMg: 25 }
            ],
            frequencia: 'uma vez ao dia, pela manhã',
            unidadeDosagem: 'comprimido',
            modo: 'adulto',
            keywords: 'hidroclorotiazida hctz diuretico tiazidico hipertensao edema adulto',
            calculoEspecial: (peso, idadeNum, idadeUnidade, opcaoSel) => {
                const doseMg = opcaoSel === 'hctz_25' ? 25 : 12.5;
                const txt = opcaoSel === 'hctz_25' ? '1 comprimido de 25 mg' : '1/2 comprimido de 25 mg (12,5 mg)';
                return { doseMg, volumeTexto: txt, tetoAtingido: false };
            }
        },

        // =====================================================================
        // 9. ANTIDIABÉTICOS (ADULTO)
        // =====================================================================
        {
            id: 'metformina_comp',
            categoria: 'antidiabeticos',
            categoriaNome: '9. Antidiabéticos',
            nome: 'Metformina Comprimido 500 mg / 850 mg',
            apresentacao: 'Comprimido 500 mg e 850 mg (cloridrato)',
            posologiaStd: '500 a 2.550 mg/dia fracionados, durante ou logo após as refeições (adulto — DM2)',
            opcoes: [
                { id: 'metf_500', nome: 'Comprimido 500 mg (2 a 3x/dia)', doseMg: 500 },
                { id: 'metf_850', nome: 'Comprimido 850 mg (2 a 3x/dia)', doseMg: 850 }
            ],
            frequencia: '2 a 3 vezes ao dia, durante ou logo após as refeições',
            unidadeDosagem: 'comprimido',
            modo: 'adulto',
            keywords: 'metformina glifage diabetes dm2 glicemia adulto',
            calculoEspecial: (peso, idadeNum, idadeUnidade, opcaoSel) => {
                const doseMg = opcaoSel === 'metf_850' ? 850 : 500;
                return { doseMg, volumeTexto: `1 comprimido de ${doseMg} mg`, tetoAtingido: false };
            }
        },
        {
            id: 'glibenclamida_comp',
            categoria: 'antidiabeticos',
            categoriaNome: '9. Antidiabéticos',
            nome: 'Glibenclamida Comprimido 5 mg',
            apresentacao: 'Comprimido 5 mg',
            posologiaStd: '2,5 a 20 mg/dia, 30 min antes do café da manhã ou da principal refeição (adulto — DM2)',
            opcoes: [
                { id: 'glib_25', nome: '1/2 comprimido (2,5 mg/dia) — início', doseMg: 2.5 },
                { id: 'glib_5', nome: 'Comprimido 5 mg/dia', doseMg: 5 }
            ],
            frequencia: 'uma vez ao dia, 30 minutos antes do café da manhã',
            unidadeDosagem: 'comprimido',
            modo: 'adulto',
            keywords: 'glibenclamida daonil sulfonilureia diabetes dm2 hipoglicemiante adulto',
            calculoEspecial: (peso, idadeNum, idadeUnidade, opcaoSel) => {
                const doseMg = opcaoSel === 'glib_5' ? 5 : 2.5;
                const txt = opcaoSel === 'glib_5' ? '1 comprimido de 5 mg' : '1/2 comprimido de 5 mg (2,5 mg)';
                return { doseMg, volumeTexto: `${txt} — atenção ao risco de hipoglicemia`, tetoAtingido: false };
            }
        },
        {
            id: 'insulina_nph_regular',
            categoria: 'antidiabeticos',
            categoriaNome: '9. Antidiabéticos',
            nome: 'Insulina Humana NPH / Regular',
            apresentacao: 'Frasco 100 UI/mL (NPH intermediária | Regular rápida) — uso SC',
            posologiaStd: 'Dose individualizada via subcutânea, conforme esquema de glicemia capilar',
            frequencia: 'conforme esquema individualizado (SC), com monitorização glicêmica',
            unidadeDosagem: 'UI',
            modo: 'adulto',
            keywords: 'insulina nph regular humulin novolin diabetes dm1 dm2 subcutanea',
            doseAdulta: { doseMg: 0, vol: 'Dose individualizada (UI) via SC conforme glicemia — registrar esquema no prontuário' }
        },

        // =====================================================================
        // 10. ANTICONCEPCIONAIS E PLANEJAMENTO FAMILIAR (ADULTO)
        // =====================================================================
        {
            id: 'aco_combinado',
            categoria: 'anticoncepcionais',
            categoriaNome: '10. Anticoncepcionais e Planejamento Familiar',
            nome: 'Etinilestradiol + Levonorgestrel (ACO Combinado)',
            apresentacao: 'Comprimido 0,03 mg + 0,15 mg — cartela com 21 comprimidos',
            posologiaStd: '1 cp/dia no mesmo horário por 21 dias + pausa de 7 dias (nova cartela no 8º dia)',
            frequencia: '1 comprimido ao dia, sempre no mesmo horário, por 21 dias; pausa de 7 dias',
            unidadeDosagem: 'fixa',
            modo: 'adulto',
            keywords: 'anticoncepcional pilula combinada etinilestradiol levonorgestrel ciclo21 yasmim selene',
            doseAdulta: { doseMg: 0, vol: '1 comprimido/dia por 21 dias (pausa de 7 dias; reiniciar no 8º dia)' }
        },
        {
            id: 'noretisterona_minipilula',
            categoria: 'anticoncepcionais',
            categoriaNome: '10. Anticoncepcionais e Planejamento Familiar',
            nome: 'Noretisterona 0,35 mg (Minipílula)',
            apresentacao: 'Comprimido 0,35 mg — cartela com 35 comprimidos',
            posologiaStd: '1 cp/dia SEM pausa entre cartelas, rigorosamente no mesmo horário (compatível com amamentação)',
            frequencia: '1 comprimido ao dia, sem pausa, sempre no mesmo horário',
            unidadeDosagem: 'fixa',
            modo: 'adulto',
            keywords: 'noretisterona minipilula progestageno anticoncepcional amamentacao lactante',
            doseAdulta: { doseMg: 0.35, vol: '1 comprimido/dia contínuo, sem pausa entre cartelas' }
        },
        {
            id: 'injetavel_mensal',
            categoria: 'anticoncepcionais',
            categoriaNome: '10. Anticoncepcionais e Planejamento Familiar',
            nome: 'Enantato de Noretisterona + Valerato de Estradiol (Injetável Mensal)',
            apresentacao: 'Ampola injetável 50 mg + 5 mg (IM)',
            posologiaStd: '1 ampola IM profunda a cada 30 dias (variação máxima de ± 3 dias)',
            frequencia: '1 ampola via intramuscular profunda a cada 30 dias (± 3 dias)',
            unidadeDosagem: 'fixa',
            modo: 'adulto',
            keywords: 'anticoncepcional injetavel mensal perlutan mesigyna intramuscular',
            doseAdulta: { doseMg: 0, vol: '1 ampola IM profunda a cada 30 dias' }
        },
        {
            id: 'injetavel_trimestral',
            categoria: 'anticoncepcionais',
            categoriaNome: '10. Anticoncepcionais e Planejamento Familiar',
            nome: 'Acetato de Medroxiprogesterona 150 mg/mL (Injetável Trimestral)',
            apresentacao: 'Ampola injetável 150 mg/mL (IM)',
            posologiaStd: '1 ampola IM profunda a cada 3 meses (12 a 13 semanas)',
            frequencia: '1 ampola via intramuscular profunda a cada 12 a 13 semanas',
            unidadeDosagem: 'fixa',
            modo: 'adulto',
            keywords: 'medroxiprogesterona depo provera anticoncepcional injetavel trimestral',
            doseAdulta: { doseMg: 150, vol: '1 ampola (150 mg) IM profunda a cada 3 meses' }
        },
        {
            id: 'levonorgestrel_emergencia',
            categoria: 'anticoncepcionais',
            categoriaNome: '10. Anticoncepcionais e Planejamento Familiar',
            nome: 'Levonorgestrel 1,5 mg (Anticoncepção de Emergência)',
            apresentacao: 'Comprimido 1,5 mg (1 cp) ou 0,75 mg (2 cp)',
            posologiaStd: 'Dose única de 1,5 mg o mais rápido possível após relação desprotegida (máx. 72h)',
            frequencia: 'dose única (quanto antes, melhor a eficácia; máximo 72 horas)',
            unidadeDosagem: 'fixa',
            modo: 'adulto',
            keywords: 'levonorgestrel pilula dia seguinte contracepcao emergencia postinor',
            doseAdulta: { doseMg: 1.5, vol: '1 comprimido de 1,5 mg (ou 2 de 0,75 mg juntos), dose única' }
        }
    ];

    // -------------------------------------------------------------------------
    // ELEMENTOS DO DOM
    // -------------------------------------------------------------------------
    const elNome = document.getElementById('paciente-nome');
    const elIdade = document.getElementById('paciente-idade');
    const elIdadeUnidade = document.getElementById('paciente-idade-unidade');
    const elPeso = document.getElementById('paciente-peso');
    const btnWeightMinus = document.getElementById('btn-weight-minus');
    const btnWeightPlus = document.getElementById('btn-weight-plus');
    const elData = document.getElementById('paciente-data');
    const elProfNome = document.getElementById('profissional-nome');
    const elProfCrm = document.getElementById('profissional-crm');

    const weightStatusDisplay = document.getElementById('weight-status-display');
    const radiosModoPrescricao = document.querySelectorAll('input[name="modo-prescricao"]');
    const gridMedicamentos = document.getElementById('grid-medicamentos');
    const categoryFilterBtns = document.querySelectorAll('.cat-btn');
    const elSearchInput = document.getElementById('search-medication');
    const btnClearSearch = document.getElementById('btn-clear-search');

    // Elementos de Hidratação
    const chkHolliday = document.getElementById('chk-holliday');
    const hsVolumeTotal = document.getElementById('hs-volume-total');
    const hsTaxaMlh = document.getElementById('hs-taxa-mlh');
    const hsGotejamento = document.getElementById('hs-gotejamento');
    const hsSG = document.getElementById('hs-sg');
    const hsNaCl = document.getElementById('hs-nacl');
    const hsKCl = document.getElementById('hs-kcl');

    // Elementos Dengue
    const chkDengue = document.getElementById('chk-dengue');
    const radioDengueGrupos = document.querySelectorAll('input[name="dengue-grupo"]');
    const dengueTituloGrupo = document.getElementById('dengue-titulo-grupo');
    const dengueVolumeTotal = document.getElementById('dengue-volume-total');
    const dengueSroVol = document.getElementById('dengue-sro-vol');
    const dengueLiquidosVol = document.getElementById('dengue-liquidos-vol');
    const dengueOrientacaoTexto = document.getElementById('dengue-orientacao-texto');

    // Elementos de Exames
    const chkExames = document.querySelectorAll('.exam-check');
    const elExamesAdicionais = document.getElementById('exames-adicionais');
    const elExamesIndicacao = document.getElementById('exames-indicacao');
    const btnLimparExames = document.getElementById('btn-limpar-exames');
    const btnIrImpressaoExames = document.getElementById('btn-ir-impressao-exames');

    // Elementos de Atestado Médico
    const radiosAtestadoFinalidade = document.querySelectorAll('input[name="atestado-finalidade"]');
    const elAtestadoDias = document.getElementById('atestado-dias');
    const elAtestadoResponsavel = document.getElementById('atestado-responsavel');
    const groupAtestadoResponsavel = document.getElementById('group-atestado-responsavel');
    const elAtestadoCid = document.getElementById('atestado-cid');
    const chkAutorizaCid = document.getElementById('chk-autoriza-cid');
    const btnLimparAtestado = document.getElementById('btn-limpar-atestado');
    const btnIrImpressaoAtestado = document.getElementById('btn-ir-impressao-atestado');

    // Elementos de Emissão & Impressão
    const docPills = document.querySelectorAll('.doc-pill');
    const previewPaperContainer = document.getElementById('preview-paper-container');
    const secaoImpressao = document.getElementById('secao-impressao');
    const btnImprimir = document.getElementById('btn-imprimir');
    const btnImprimirTexto = document.getElementById('btn-imprimir-texto');
    const btnCopiarTexto = document.getElementById('btn-copiar-texto');
    const btnLimparPrescricao = document.getElementById('btn-limpar-prescricao');
    const btnNovoPaciente = document.getElementById('btn-novo-paciente');
    const btnNovoPacienteTop = document.getElementById('btn-novo-paciente-top');

    let categoriaFiltroAtiva = 'todos';
    let termoBuscaAtivo = '';
    let modoPrescricao = 'ped'; // 'ped' (por peso) | 'adulto' (dose fixa)
    const porPesoMeds = new Set(); // cards do modo adulto com cálculo por peso ativado
    const ADULTO_REF_PESO = 40; // peso de referência p/ regimes com faixas (>= 30/40 kg)
    let documentoTipoAtivo = 'receita'; // 'receita' | 'exames' | 'atestado'

    // -------------------------------------------------------------------------
    // INICIALIZAÇÃO DA DATA ATUAL E RENDERIZAÇÃO
    // -------------------------------------------------------------------------
    const hoje = new Date();
    const dataFormatada = hoje.toLocaleDateString('pt-BR');
    if (elData) elData.value = dataFormatada;

    // Renderizar os cards de medicamentos
    document.body.classList.add('aba-medicamentos');
    renderizarCardsMedicamentos();

    // Restaurar atendimento + perfil do profissional salvos (Fase 1)
    const restaurouAtendimento = (typeof restaurarEstado === 'function') ? restaurarEstado() : false;

    atualizarDocumentoPreview();

    // -------------------------------------------------------------------------
    // SELETOR DE MODO DE PRESCRIÇÃO (Pediatria por peso | Adulto dose fixa)
    // -------------------------------------------------------------------------
    radiosModoPrescricao.forEach(radio => {
        radio.addEventListener('change', (e) => {
            modoPrescricao = e.target.value === 'adulto' ? 'adulto' : 'ped';
            document.body.classList.toggle('modo-adulto', modoPrescricao === 'adulto');
            reRenderPreservandoSelecao();
        });
    });

    // -------------------------------------------------------------------------
    // STEPPER DE PESO CONTROLS (+ / -)
    // -------------------------------------------------------------------------
    if (btnWeightMinus && elPeso) {
        btnWeightMinus.addEventListener('click', () => {
            let currentVal = parseFloat(elPeso.value);
            if (isNaN(currentVal)) currentVal = 10.0;
            if (currentVal > 0.5) {
                currentVal = Math.max(0.5, currentVal - 0.5);
                elPeso.value = currentVal.toFixed(1);
                recalcularTudo();
            }
        });
    }

    if (btnWeightPlus && elPeso) {
        btnWeightPlus.addEventListener('click', () => {
            let currentVal = parseFloat(elPeso.value);
            if (isNaN(currentVal)) currentVal = 10.0;
            currentVal = Math.min(120, currentVal + 0.5);
            elPeso.value = currentVal.toFixed(1);
            recalcularTudo();
        });
    }

    // Eventos para atualização em tempo real
    if (elPeso) elPeso.addEventListener('input', recalcularTudo);
    if (elNome) {
        elNome.addEventListener('input', () => {
            recalcularTudo();
            atualizarDocumentoPreview();
        });
    }
    if (elIdade) elIdade.addEventListener('input', recalcularTudo);
    if (elIdadeUnidade) elIdadeUnidade.addEventListener('change', recalcularTudo);
    if (elProfNome) elProfNome.addEventListener('input', atualizarDocumentoPreview);
    if (elProfCrm) elProfCrm.addEventListener('input', atualizarDocumentoPreview);

    if (chkHolliday) chkHolliday.addEventListener('change', () => {
        if (chkHolliday.checked) {
            recalcularTudo();
        } else {
            zerarHollidayDisplays();
            atualizarDocumentoPreview();
        }
    });
    if (chkDengue) chkDengue.addEventListener('change', () => {
        if (chkDengue.checked) {
            calcularDengue();
            atualizarDocumentoPreview();
        } else {
            zerarDengueDisplays();
            atualizarDocumentoPreview();
        }
    });

    radioDengueGrupos.forEach(radio => {
        radio.addEventListener('change', () => {
            calcularDengue();
            atualizarDocumentoPreview();
        });
    });

    // LISTENERS DE PESQUISA DE MEDICAMENTOS (LIVE SEARCH)
    if (elSearchInput) {
        elSearchInput.addEventListener('input', (e) => {
            termoBuscaAtivo = e.target.value.toLowerCase().trim();
            if (btnClearSearch) {
                btnClearSearch.style.display = termoBuscaAtivo.length > 0 ? 'block' : 'none';
            }
            filtrarCardsPorCategoriaEBusca();
        });
    }

    if (btnClearSearch) {
        btnClearSearch.addEventListener('click', () => {
            if (elSearchInput) elSearchInput.value = '';
            termoBuscaAtivo = '';
            btnClearSearch.style.display = 'none';
            filtrarCardsPorCategoriaEBusca();
        });
    }

    // Listeners do Módulo de Exames
    chkExames.forEach(chk => {
        chk.addEventListener('change', atualizarDocumentoPreview);
    });
    if (elExamesAdicionais) elExamesAdicionais.addEventListener('input', atualizarDocumentoPreview);
    if (elExamesIndicacao) elExamesIndicacao.addEventListener('input', atualizarDocumentoPreview);

    if (btnLimparExames) {
        btnLimparExames.addEventListener('click', () => {
            chkExames.forEach(c => c.checked = false);
            if (elExamesAdicionais) elExamesAdicionais.value = '';
            if (elExamesIndicacao) elExamesIndicacao.value = '';
            atualizarDocumentoPreview();
            agendarSalvamento();
        });
    }

    if (btnIrImpressaoExames) {
        btnIrImpressaoExames.addEventListener('click', () => {
            ativarAbaDocumento('exames');
        });
    }

    // Listeners do Módulo de Atestado
    radiosAtestadoFinalidade.forEach(radio => {
        radio.addEventListener('change', () => {
            atualizarVisibilidadeResponsavel();
            atualizarDocumentoPreview();
        });
    });
    if (elAtestadoDias) elAtestadoDias.addEventListener('input', atualizarDocumentoPreview);
    if (elAtestadoResponsavel) elAtestadoResponsavel.addEventListener('input', atualizarDocumentoPreview);
    if (elAtestadoCid) elAtestadoCid.addEventListener('input', atualizarDocumentoPreview);
    if (chkAutorizaCid) chkAutorizaCid.addEventListener('change', atualizarDocumentoPreview);

    if (btnLimparAtestado) {
        btnLimparAtestado.addEventListener('click', () => {
            const radRepouso = document.querySelector('input[name="atestado-finalidade"][value="repouso"]');
            if (radRepouso) radRepouso.checked = true;
            if (elAtestadoDias) elAtestadoDias.value = 1;
            if (elAtestadoResponsavel) elAtestadoResponsavel.value = '';
            if (elAtestadoCid) elAtestadoCid.value = '';
            if (chkAutorizaCid) chkAutorizaCid.checked = false;
            atualizarVisibilidadeResponsavel();
            atualizarDocumentoPreview();
            agendarSalvamento();
        });
    }

    if (btnIrImpressaoAtestado) {
        btnIrImpressaoAtestado.addEventListener('click', () => {
            ativarAbaDocumento('atestado');
        });
    }

    function atualizarVisibilidadeResponsavel() {
        const radioSel = document.querySelector('input[name="atestado-finalidade"]:checked');
        const isAcompanhamento = radioSel && radioSel.value === 'acompanhamento';
        if (groupAtestadoResponsavel) {
            groupAtestadoResponsavel.style.opacity = isAcompanhamento ? '1' : '0.6';
        }
    }

    // Seletor de tipo de documento (Pills na aba Exportar)
    docPills.forEach(pill => {
        pill.addEventListener('click', () => {
            const docType = pill.getAttribute('data-doc-type');
            setTipoDocumentoAtivo(docType);
        });
    });

    function setTipoDocumentoAtivo(docType) {
        documentoTipoAtivo = docType;
        docPills.forEach(p => {
            if (p.getAttribute('data-doc-type') === docType) {
                p.classList.add('active');
            } else {
                p.classList.remove('active');
            }
        });

        if (btnImprimirTexto) {
            if (docType === 'receita') btnImprimirTexto.textContent = 'Imprimir Prescrição (A4)';
            else if (docType === 'exames') btnImprimirTexto.textContent = 'Imprimir Exames (A4)';
            else if (docType === 'atestado') btnImprimirTexto.textContent = 'Imprimir Atestado (A4)';
        }

        atualizarDocumentoPreview();
        document.dispatchEvent(new CustomEvent('documento:alterado', { detail: { tipo: docType } }));
    }

    function ativarAbaDocumento(docType) {
        setTipoDocumentoAtivo(docType);
        // Ativar aba Exportador no DOM (com sync de hash + autosave)
        ativarAba('exportador');
    }

    if (btnImprimir) {
        btnImprimir.addEventListener('click', () => {
            atualizarDocumentoPreview();
            window.print();
        });
    }

    // COPIAR TEXTO DA PRESCRIÇÃO PARA O PRONTUÁRIO ELETRÔNICO (PEP)
    if (btnCopiarTexto) {
        btnCopiarTexto.addEventListener('click', () => {
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = previewPaperContainer.innerHTML;
            const plainText = tempDiv.innerText || tempDiv.textContent;

            navigator.clipboard.writeText(plainText).then(() => {
                const originalText = btnCopiarTexto.textContent;
                btnCopiarTexto.textContent = '✓ Copiado para a área de transferência!';
                btnCopiarTexto.style.backgroundColor = '#059669';
                btnCopiarTexto.style.color = '#ffffff';

                setTimeout(() => {
                    btnCopiarTexto.textContent = originalText;
                    btnCopiarTexto.style.backgroundColor = '';
                    btnCopiarTexto.style.color = '';
                }, 2500);
            }).catch(err => {
                alert('Erro ao copiar texto: ' + err);
            });
        });
    }

    function limparPrescricao() {
        document.querySelectorAll('.prescricao-check').forEach(chk => chk.checked = false);
        document.querySelectorAll('.med-card').forEach(card => card.classList.remove('selected'));
        chkExames.forEach(c => c.checked = false);
        if (elExamesAdicionais) elExamesAdicionais.value = '';
        if (elExamesIndicacao) elExamesIndicacao.value = '';
        
        const radRepouso = document.querySelector('input[name="atestado-finalidade"][value="repouso"]');
        if (radRepouso) radRepouso.checked = true;
        if (elAtestadoDias) elAtestadoDias.value = 1;
        if (elAtestadoResponsavel) elAtestadoResponsavel.value = '';
        if (elAtestadoCid) elAtestadoCid.value = '';
        if (chkAutorizaCid) chkAutorizaCid.checked = false;

        zerarHollidayDisplays();
        zerarDengueDisplays();
        atualizarVisibilidadeResponsavel();
        atualizarDocumentoPreview();
        document.dispatchEvent(new CustomEvent('atendimento:limpar'));
    }

    function novoPacienteReset() {
        if (confirm('Deseja iniciar um novo atendimento zerado? Os dados do paciente e da prescrição serão limpos (o perfil do profissional é mantido).')) {
            if (elNome) elNome.value = '';
            if (elIdade) elIdade.value = '';
            if (elIdadeUnidade) elIdadeUnidade.value = 'anos';
            if (elPeso) elPeso.value = '10.0';
            // Perfil do profissional (nome/CRM) é preservado de propósito: é o mesmo
            // médico em todo atendimento e fica salvo separado (STORAGE_PROF).

            limparPrescricao();
            recalcularTudo();
            document.dispatchEvent(new CustomEvent('atendimento:limpar'));
        }
    }

    if (btnLimparPrescricao) {
        btnLimparPrescricao.addEventListener('click', limparPrescricao);
    }
    if (btnNovoPaciente) {
        btnNovoPaciente.addEventListener('click', novoPacienteReset);
    }
    if (btnNovoPacienteTop) {
        btnNovoPacienteTop.addEventListener('click', novoPacienteReset);
    }

    // Filtros por Categoria de Medicamentos
    categoryFilterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            categoryFilterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            categoriaFiltroAtiva = btn.getAttribute('data-category');
            filtrarCardsPorCategoriaEBusca();
        });
    });

    // Controle de Abas Principal
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanels = document.querySelectorAll('.tab-panel');
    const ABAS_VALIDAS = ['medicamentos', 'hidratacao', 'exames', 'atestado', 'exportador'];

    // Ativa uma aba. Com `atualizarHash`, sincroniza o location.hash (deep-link,
    // botão voltar e "lembrar a aba" no F5). Dispara evento 'aba:alterada' p/ autosave.
    function ativarAba(targetTab, atualizarHash = true) {
        if (!ABAS_VALIDAS.includes(targetTab)) return;
        tabBtns.forEach(b => b.classList.remove('active'));
        tabPanels.forEach(p => p.classList.remove('active'));

        const targetBtn = document.querySelector(`.tab-btn[data-tab="${targetTab}"]`);
        const targetPanel = document.getElementById(`painel-${targetTab}`);
        if (targetBtn) targetBtn.classList.add('active');
        if (targetPanel) targetPanel.classList.add('active');
        document.body.classList.toggle('aba-medicamentos', targetTab === 'medicamentos');

        if (atualizarHash && location.hash !== `#${targetTab}`) {
            history.pushState(null, '', `#${targetTab}`);
        }
        document.dispatchEvent(new CustomEvent('aba:alterada', { detail: { aba: targetTab } }));
    }

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            ativarAba(btn.getAttribute('data-tab'));
        });
    });

    // Botão Voltar / Avançar do navegador alterna a aba conforme o hash
    window.addEventListener('popstate', () => {
        const aba = location.hash.replace('#', '');
        ativarAba(ABAS_VALIDAS.includes(aba) ? aba : 'medicamentos', false);
    });

    // Aba inicial: prioriza o hash da URL (deep-link / F5); se ausente, usa a aba
    // restaurada do autosave; por fim, cai em Medicamentos. Não grava hash aqui para
    // não poluir o histórico logo no carregamento.
    const abaInicialHash = location.hash.replace('#', '');
    const abaInicial = ABAS_VALIDAS.includes(abaInicialHash)
        ? abaInicialHash
        : (restaurouAtendimento && (() => {
            try {
                const a = JSON.parse(localStorage.getItem(STORAGE_ATEND) || 'null');
                return a && ABAS_VALIDAS.includes(a.abaAtiva) ? a.abaAtiva : null;
            } catch (e) { return null; }
        })()) || 'medicamentos';
    ativarAba(abaInicial, false);

    // -------------------------------------------------------------------------
    // FUNÇÕES DE RENDERIZAÇÃO E CÁLCULO
    // -------------------------------------------------------------------------

    // Re-renderiza os cards preservando medicações marcadas e regimes escolhidos
    function reRenderPreservandoSelecao() {
        const selecionados = [...document.querySelectorAll('.med-checkbox:checked')].map(c => c.getAttribute('data-med-id'));
        const opcoesSel = {};
        document.querySelectorAll('.med-option-select').forEach(s => {
            opcoesSel[s.getAttribute('data-med-id')] = s.value;
        });

        renderizarCardsMedicamentos();

        selecionados.forEach(id => {
            const medObj = medicamentos.find(m => m.id === id);
            if (modoPrescricao === 'ped' && medObj && medObj.modo === 'adulto') return;
            const chk = document.getElementById(`chk-med-${id}`);
            if (chk) {
                chk.checked = true;
                const card = document.getElementById(`card-med-${id}`);
                if (card) card.classList.add('selected');
            }
        });
        Object.entries(opcoesSel).forEach(([id, val]) => {
            const sel = document.getElementById(`sel-op-${id}`);
            if (sel) sel.value = val;
        });

        recalcularTudo();
    }

    function renderizarCardsMedicamentos() {
        if (!gridMedicamentos) return;
        gridMedicamentos.innerHTML = '';

        const medsOrdenados = [...medicamentos].sort((a, b) => a.nome.localeCompare(b.nome, 'pt-BR'));

        medsOrdenados.forEach(med => {
            const card = document.createElement('article');
            card.className = 'med-card';
            card.id = `card-med-${med.id}`;
            card.setAttribute('data-categoria', med.categoria);
            card.setAttribute('data-modo', med.modo || 'ped');
            card.setAttribute('data-search', `${med.nome} ${med.apresentacao} ${med.keywords || ''}`.toLowerCase());

            let htmlOpcoes = '';
            if (med.opcoes && med.opcoes.length > 0) {
                htmlOpcoes = `
                    <div class="med-option-selector">
                        <label for="sel-op-${med.id}">Regime / Indicação:</label>
                        <select id="sel-op-${med.id}" class="med-option-select" data-med-id="${med.id}">
                            ${med.opcoes.map(op => `<option value="${op.id}">${op.nome}</option>`).join('')}
                        </select>
                    </div>
                `;
            }

            card.innerHTML = `
                <div>
                    <span class="med-card-category-tag">${med.categoriaNome}</span>
                    <div class="med-card-header">
                        <div class="med-info">
                            <h4>${med.nome}</h4>
                            <span class="med-sub">${med.apresentacao}</span>
                        </div>
                        <label class="select-checkbox-label">
                            <input type="checkbox" id="chk-med-${med.id}" class="prescricao-check med-checkbox" data-med-id="${med.id}">
                            Incluir
                        </label>
                    </div>
                    ${htmlOpcoes}
                    ${modoPrescricao === 'adulto' ? `
                    <label class="por-peso-toggle" title="Ativar cálculo individualizado por peso (mg/kg) para este medicamento">
                        <input type="checkbox" class="por-peso-check" data-med-id="${med.id}" ${porPesoMeds.has(med.id) ? 'checked' : ''}>
                        Calcular por peso (mg/kg)
                    </label>` : ''}
                </div>

                <div class="med-calc-box">
                    <div class="calc-row">
                        <span class="label">Posologia Recomendada:</span>
                        <span class="value">${med.posologiaStd}</span>
                    </div>
                    <div class="calc-row">
                        <span class="label">${modoPrescricao === 'adulto' && !porPesoMeds.has(med.id) ? 'Dose Adulta (fixa):' : 'Dose Calculada:'}</span>
                        <span class="value" id="res-mg-${med.id}">--</span>
                    </div>
                    <div class="calc-row">
                        <span class="label">Volume / Prescrição:</span>
                        <span class="value highlight" id="res-vol-${med.id}">--</span>
                    </div>
                    <div class="max-cap-badge" id="badge-teto-${med.id}">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/>
                            <line x1="12" y1="9" x2="12" y2="13"/>
                            <line x1="12" y1="17" x2="12.01" y2="17"/>
                        </svg>
                        Teto máximo atingido
                    </div>
                </div>
            `;

            gridMedicamentos.appendChild(card);

            // Listener de seleção visual do card ao marcar checkbox
            const chk = card.querySelector('.med-checkbox');
            chk.addEventListener('change', (e) => {
                if (e.target.checked) {
                    card.classList.add('selected');
                } else {
                    card.classList.remove('selected');
                }
                atualizarDocumentoPreview();
            });

            // Listener para troca de regime/indicação
            const selOp = card.querySelector('.med-option-select');
            if (selOp) {
                selOp.addEventListener('change', () => {
                    const peso = parseFloat(elPeso.value);
                    if (!isNaN(peso) && peso > 0) {
                        calcularMedicamentos(peso);
                        atualizarDocumentoPreview();
                    } else if (modoPrescricao === 'adulto') {
                        calcularMedicamentos(ADULTO_REF_PESO);
                        atualizarDocumentoPreview();
                    }
                });
            }

            // Listener do cálculo por peso individual (modo Adulto)
            const porPesoChk = card.querySelector('.por-peso-check');
            if (porPesoChk) {
                porPesoChk.addEventListener('change', (e) => {
                    if (e.target.checked) {
                        porPesoMeds.add(med.id);
                    } else {
                        porPesoMeds.delete(med.id);
                    }
                    reRenderPreservandoSelecao();
                });
            }
        });

        filtrarCardsPorCategoriaEBusca();
        recalcularTudo();
    }

    function filtrarCardsPorCategoriaEBusca() {
        if (!gridMedicamentos) return;
        const cards = gridMedicamentos.querySelectorAll('.med-card');
        cards.forEach(card => {
            const cat = card.getAttribute('data-categoria');
            const searchData = card.getAttribute('data-search') || '';

            const matchCat = (categoriaFiltroAtiva === 'todos' || cat === categoriaFiltroAtiva);
            const matchSearch = (termoBuscaAtivo === '' || searchData.includes(termoBuscaAtivo));
            const matchModo = modoPrescricao === 'adulto' || card.getAttribute('data-modo') !== 'adulto';

            if (matchCat && matchSearch && matchModo) {
                card.style.display = 'flex';
            } else {
                card.style.display = 'none';
            }
        });

        atualizarIndiceAZ();
    }

    // Índice alfabético A–Z (estilo galeria de apps) — salta para a 1ª medicação da letra
    function atualizarIndiceAZ() {
        const container = document.getElementById('az-index');
        if (!container) return;

        const cardsVisiveis = [...document.querySelectorAll('.med-card')].filter(c => c.style.display !== 'none');
        const letrasAtivas = new Set(
            cardsVisiveis.map(c => {
                const nome = c.querySelector('h4') ? c.querySelector('h4').textContent.trim() : '';
                return nome ? nome[0].toUpperCase() : '';
            }).filter(l => l)
        );

        container.innerHTML = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map(letra =>
            letrasAtivas.has(letra)
                ? `<button type="button" class="az-letra" data-letra="${letra}" title="Ir para ${letra}">${letra}</button>`
                : `<span class="az-letra az-off">${letra}</span>`
        ).join('');

        container.querySelectorAll('button.az-letra').forEach(btn => {
            btn.addEventListener('click', () => {
                const alvo = [...document.querySelectorAll('.med-card')].find(c => {
                    if (c.style.display === 'none') return false;
                    const nome = c.querySelector('h4') ? c.querySelector('h4').textContent.trim() : '';
                    return nome && nome[0].toUpperCase() === btn.getAttribute('data-letra');
                });
                if (alvo) {
                    const y = alvo.getBoundingClientRect().top + window.scrollY - 90;
                    window.scrollTo({ top: y, behavior: 'smooth' });
                    alvo.classList.add('az-flash');
                    setTimeout(() => alvo.classList.remove('az-flash'), 1200);
                }
            });
        });
    }

    function recalcularTudo() {
        const peso = parseFloat(elPeso.value);
        const isAdulto = modoPrescricao === 'adulto';

        if (isNaN(peso) || peso <= 0) {
            if (isAdulto) {
                if (weightStatusDisplay) {
                    weightStatusDisplay.textContent = 'Modo Adulto: dose fixa (peso opcional p/ cálculo por kg)';
                    weightStatusDisplay.classList.add('ready');
                }
                calcularMedicamentos(0);
                atualizarDocumentoPreview();
                return;
            }
            if (weightStatusDisplay) {
                weightStatusDisplay.textContent = 'Insira um peso válido';
                weightStatusDisplay.classList.remove('ready');
            }
            limparResultados();
            return;
        }

        if (weightStatusDisplay) {
            weightStatusDisplay.textContent = isAdulto
                ? `Modo Adulto: dose fixa | Peso registrado: ${peso.toFixed(1)} kg`
                : `Peso ativo: ${peso.toFixed(1)} kg`;
            weightStatusDisplay.classList.add('ready');
        }

        // Recalcular Medicamentos
        calcularMedicamentos(peso);

        // Hidratação só exibe valores quando o protocolo está selecionado
        if (chkHolliday && chkHolliday.checked) {
            calcularHollidaySegar(peso);
        } else {
            zerarHollidayDisplays();
        }

        if (chkDengue && chkDengue.checked) {
            calcularDengue(peso);
        } else {
            zerarDengueDisplays();
        }

        // Atualizar Documento Preview
        atualizarDocumentoPreview();
    }

    function limparResultados() {
        medicamentos.forEach(med => {
            const resMg = document.getElementById(`res-mg-${med.id}`);
            const resVol = document.getElementById(`res-vol-${med.id}`);
            const badge = document.getElementById(`badge-teto-${med.id}`);

            if (resMg) resMg.textContent = '--';
            if (resVol) resVol.textContent = '--';
            if (badge) badge.classList.remove('active');
        });

        if (hsVolumeTotal) hsVolumeTotal.textContent = '0 mL/dia';
        if (hsTaxaMlh) hsTaxaMlh.textContent = '0 mL/h';
        if (hsGotejamento) hsGotejamento.textContent = '0 got/min';
        if (hsSG) hsSG.textContent = '0 mL';
        if (hsNaCl) hsNaCl.textContent = '0 mL';
        if (hsKCl) hsKCl.textContent = '0 mL';

        if (dengueVolumeTotal) dengueVolumeTotal.textContent = '0 mL/dia';
        if (dengueSroVol) dengueSroVol.textContent = '0 mL';
        if (dengueLiquidosVol) dengueLiquidosVol.textContent = '0 mL';

        atualizarDocumentoPreview();
    }

    function calcularMedicamentos(peso) {
        const idadeNum = parseFloat(elIdade ? elIdade.value : 0);
        const idadeUnidade = elIdadeUnidade ? elIdadeUnidade.value : 'anos';

        medicamentos.forEach(med => {
            const elResMg = document.getElementById(`res-mg-${med.id}`);
            const elResVol = document.getElementById(`res-vol-${med.id}`);
            const badge = document.getElementById(`badge-teto-${med.id}`);
            const selOp = document.getElementById(`sel-op-${med.id}`);
            const opcaoSel = selOp ? selOp.value : null;

            if (!elResMg || !elResVol) return;

            let doseCalculadaMg = 0;
            let volumeTexto = '';
            let tetoAtingido = false;

            // ---- MODO ADULTO (dose fixa) ----
            if (modoPrescricao === 'adulto' && !porPesoMeds.has(med.id)) {
                if (med.doseAdulta) {
                    doseCalculadaMg = med.doseAdulta.doseMg;
                    volumeTexto = med.doseAdulta.vol;
                } else if (med.calculoEspecial) {
                    const res = med.calculoEspecial(ADULTO_REF_PESO, 40, 'anos', opcaoSel);
                    doseCalculadaMg = res.doseMg;
                    volumeTexto = res.volumeTexto;
                } else if (med.tetoDoseMg) {
                    doseCalculadaMg = med.tetoDoseMg;
                    if (med.unidadeDosagem === 'gotas') {
                        const ml = doseCalculadaMg / med.concentracaoMgMl;
                        const gotas = Math.round(ml * (med.gotasPorMl || 20));
                        volumeTexto = `${gotas} gotas (${ml.toFixed(1)} mL)`;
                    } else if (med.unidadeDosagem === 'mL') {
                        const ml = doseCalculadaMg / med.concentracaoMgMl;
                        volumeTexto = `${ml.toFixed(1)} mL`;
                    } else {
                        volumeTexto = `${doseCalculadaMg.toFixed(1)} ${med.unidadeDosagem || 'mg'}`;
                    }
                } else {
                    volumeTexto = 'Dose fixa conforme regime selecionado';
                }

                if (badge) badge.classList.remove('active');
                elResMg.textContent = med.unidadeDosagem === 'UI' ? `${doseCalculadaMg} UI`
                    : med.unidadeDosagem === 'fixa' ? 'Dose fixa'
                    : `${doseCalculadaMg.toFixed(1)} mg`;
                elResVol.textContent = volumeTexto;
                return;
            }

            // ---- MODO POR PESO (pediatria ou adulto com toggle) ----
            if (modoPrescricao === 'adulto' && (isNaN(peso) || peso <= 0)) {
                if (badge) badge.classList.remove('active');
                elResMg.textContent = '--';
                elResVol.textContent = 'Informe o peso do paciente para calcular por kg';
                return;
            }

            if (med.calculoEspecial) {
                const res = med.calculoEspecial(peso, idadeNum, idadeUnidade, opcaoSel);
                doseCalculadaMg = res.doseMg;
                volumeTexto = res.volumeTexto;
                tetoAtingido = res.tetoAtingido;
            } else {
                doseCalculadaMg = peso * med.doseMgKg;
                if (med.tetoDoseMg && doseCalculadaMg > med.tetoDoseMg) {
                    doseCalculadaMg = med.tetoDoseMg;
                    tetoAtingido = true;
                }

                if (med.unidadeDosagem === 'gotas') {
                    const ml = doseCalculadaMg / med.concentracaoMgMl;
                    const gotas = Math.round(ml * (med.gotasPorMl || 20));
                    volumeTexto = `${gotas} gotas (${ml.toFixed(1)} mL)`;
                } else if (med.unidadeDosagem === 'mL') {
                    const ml = doseCalculadaMg / med.concentracaoMgMl;
                    volumeTexto = `${ml.toFixed(1)} mL`;
                } else {
                    volumeTexto = `${doseCalculadaMg.toFixed(1)} ${med.unidadeDosagem || 'mg'}`;
                }
            }

            if (badge) {
                if (tetoAtingido) {
                    badge.classList.add('active');
                } else {
                    badge.classList.remove('active');
                }
            }

            elResMg.textContent = med.unidadeDosagem === 'UI' ? `${doseCalculadaMg} UI` : `${doseCalculadaMg.toFixed(1)} mg`;
            elResVol.textContent = volumeTexto;
        });
    }

    function zerarHollidayDisplays() {
        if (hsVolumeTotal) hsVolumeTotal.textContent = '0 mL/dia';
        if (hsTaxaMlh) hsTaxaMlh.textContent = '0 mL/h';
        if (hsGotejamento) hsGotejamento.textContent = '0 got/min';
        if (hsSG) hsSG.textContent = '0 mL';
        if (hsNaCl) hsNaCl.textContent = '0 mL';
        if (hsKCl) hsKCl.textContent = '0 mL';
    }

    function zerarDengueDisplays() {
        if (dengueVolumeTotal) dengueVolumeTotal.textContent = '0 mL/dia';
        if (dengueSroVol) dengueSroVol.textContent = '0 mL';
        if (dengueLiquidosVol) dengueLiquidosVol.textContent = '0 mL';
        if (dengueOrientacaoTexto) dengueOrientacaoTexto.textContent = '';
    }

    function calcularHollidaySegar(peso) {
        let volumeTotal = 0;

        if (peso <= 10) {
            volumeTotal = peso * 100;
        } else if (peso <= 20) {
            volumeTotal = 1000 + ((peso - 10) * 50);
        } else {
            volumeTotal = 1500 + ((peso - 20) * 20);
        }

        // Teto máximo de manutenção hídrica diária padrão (2500 mL)
        if (volumeTotal > 2500) volumeTotal = 2500;

        const taxaMlh = volumeTotal / 24;
        const gotejamentoGotas = taxaMlh / 3;

        // Eletrólitos para SG 5%
        const naclMl = (volumeTotal / 100) * 2;
        const kclMl = (volumeTotal / 100) * 1;

        if (hsVolumeTotal) hsVolumeTotal.textContent = `${Math.round(volumeTotal)} mL/dia`;
        if (hsTaxaMlh) hsTaxaMlh.textContent = `${taxaMlh.toFixed(1)} mL/h`;
        if (hsGotejamento) hsGotejamento.textContent = `${gotejamentoGotas.toFixed(1)} got/min (${Math.round(taxaMlh)} mcg/min)`;

        if (hsSG) hsSG.textContent = `${Math.round(volumeTotal)} mL`;
        if (hsNaCl) hsNaCl.textContent = `${naclMl.toFixed(1)} mL`;
        if (hsKCl) hsKCl.textContent = `${kclMl.toFixed(1)} mL`;
    }

    function calcularDengue(pesoParam) {
        const peso = pesoParam || parseFloat(elPeso ? elPeso.value : 10);
        const radioSel = document.querySelector('input[name="dengue-grupo"]:checked');
        const grupo = radioSel ? radioSel.value : 'A';

        if (isNaN(peso) || peso <= 0) return;

        let volTotal = 0;
        let sro = 0;
        let liquidos = 0;
        let orientacao = '';

        if (grupo === 'A') {
            if (dengueTituloGrupo) dengueTituloGrupo.textContent = 'Grupo A - Hidratação Oral Domiciliar';
            volTotal = peso * 60;
            sro = volTotal * (1 / 3);
            liquidos = volTotal * (2 / 3);
            orientacao = 'Administrar 60 mL/kg/dia VO. Oferecer 1/3 em SRO e 2/3 em água, sucos e chás de forma contínua.';
        } else if (grupo === 'B') {
            if (dengueTituloGrupo) dengueTituloGrupo.textContent = 'Grupo B - Hidratação Oral Supervisionada';
            volTotal = peso * 80;
            sro = volTotal * (1 / 3);
            liquidos = volTotal * (2 / 3);
            orientacao = 'Administrar 80 mL/kg/dia VO sob observação no serviço de saúde até resultado de exames laboratoriais.';
        } else if (grupo === 'C') {
            if (dengueTituloGrupo) dengueTituloGrupo.textContent = 'Grupo C - Expansão Venosa de Emergência';
            volTotal = peso * 10;
            sro = 0;
            liquidos = volTotal;
            orientacao = `Fase de Expansão EV: 10 mL/kg/h nas primeiras 2 horas (${volTotal.toFixed(0)} mL/h em Soro Fisiológico 0.9% ou Ringer Lactato). Reavaliar paciente a cada 2 horas.`;
        } else if (grupo === 'D') {
            if (dengueTituloGrupo) dengueTituloGrupo.textContent = 'Grupo D - Expansão Venosa Rápida em Choque';
            volTotal = peso * 20;
            sro = 0;
            liquidos = volTotal;
            orientacao = `Fase de Expansão Rápida EV em emergência: 20 mL/kg em 20 minutos (${volTotal.toFixed(0)} mL em 20 min). Repetir até 3 vezes se necessário. Encaminhar para UTI Pediátrica.`;
        }

        if (dengueVolumeTotal) dengueVolumeTotal.textContent = `${Math.round(volTotal)} ${grupo === 'C' || grupo === 'D' ? 'mL (Fase Inicial)' : 'mL/dia'}`;
        if (dengueSroVol) dengueSroVol.textContent = sro > 0 ? `${Math.round(sro)} mL (1/3)` : 'N/A (Fase EV)';
        if (dengueLiquidosVol) dengueLiquidosVol.textContent = liquidos > 0 ? `${Math.round(liquidos)} mL ${sro > 0 ? '(2/3)' : ''}` : 'N/A';
        if (dengueOrientacaoTexto) dengueOrientacaoTexto.textContent = orientacao;
    }

    // -------------------------------------------------------------------------
    // GERADORES DE DOCUMENTOS E IMPRESSÃO MULTIDOCUMENTO
    // -------------------------------------------------------------------------

    function numeroPorExtenso(num) {
        const n = parseInt(num);
        const extenso = ['zero', 'um', 'dois', 'três', 'quatro', 'cinco', 'seis', 'sete', 'oito', 'nove', 'dez', 'onze', 'doze', 'treze', 'quatorze', 'quinze', 'dezesseis', 'dezessete', 'dezoito', 'dezenove', 'vinte', 'vinte e um', 'vinte e dois', 'vinte e três', 'vinte e quatro', 'vinte e cinco', 'vinte e seis', 'vinte e sete', 'vinte e oito', 'vinte e nove', 'trinta'];
        if (!isNaN(n) && n >= 0 && n <= 30) return extenso[n];
        return num.toString();
    }

    function gerarHeaderFooterDocumento(tituloDoc, subtituloDoc) {
        const nome = elNome && elNome.value.trim() ? elNome.value.trim() : 'Paciente Não Identificado';
        const idadeVal = elIdade ? elIdade.value.trim() : '';
        const unidade = elIdadeUnidade ? elIdadeUnidade.value : 'anos';
        const idadeTexto = idadeVal ? `${idadeVal} ${unidade}` : '--';
        const pesoVal = parseFloat(elPeso ? elPeso.value : 0);
        const pesoTexto = !isNaN(pesoVal) && pesoVal > 0 ? `${pesoVal.toFixed(1)} kg` : '--';
        const dataTexto = elData && elData.value ? elData.value : new Date().toLocaleDateString('pt-BR');

        const profNomeVal = (elProfNome && elProfNome.value.trim()) ? elProfNome.value.trim() : 'Dr. Médico Prescritor';
        const profCrmVal = (elProfCrm && elProfCrm.value.trim()) ? elProfCrm.value.trim() : 'CRM/UF 000000';

        let profHtml = `<p class="print-prof-name"><strong>${profNomeVal}</strong></p><p class="print-prof-details">${profCrmVal}</p>`;

        return {
            nome, idadeTexto, pesoTexto, dataTexto, profHtml, profNomeVal, profCrmVal, tituloDoc, subtituloDoc
        };
    }

    function gerarHtmlReceita(isPrint) {
        const tituloReceita = modoPrescricao === 'adulto' ? 'PRESCRIÇÃO MÉDICA' : 'PRESCRIÇÃO MÉDICA PEDIÁTRICA';
        const meta = gerarHeaderFooterDocumento(tituloReceita, 'PrescMed • Suporte à Decisão Clínica');
        const peso = parseFloat(elPeso ? elPeso.value : 0);

        // Medicamentos
        const medSelecionados = [];
        document.querySelectorAll('.med-checkbox:checked').forEach(chk => {
            const medId = chk.getAttribute('data-med-id');
            const med = medicamentos.find(m => m.id === medId);
            if (med) medSelecionados.push(med);
        });

        let medListHtml = '';
        if (medSelecionados.length === 0) {
            medListHtml = isPrint ? '<li>Sem prescrição medicamentosa selecionada.</li>' : '<li class="empty-msg">Nenhum medicamento selecionado. Marque as medicações desejadas na aba Medicamentos.</li>';
        } else {
            medSelecionados.forEach(med => {
                const elResVol = document.getElementById(`res-vol-${med.id}`);
                let volTexto = elResVol ? elResVol.textContent : '--';
                const selOp = document.getElementById(`sel-op-${med.id}`);
                let freqTexto = med.frequencia;

                if (selOp && med.opcoes) {
                    const opObj = med.opcoes.find(o => o.id === selOp.value);
                    if (opObj && opObj.freq) freqTexto = opObj.freq;
                }

                medListHtml += `<li><strong>${med.nome}</strong> (${med.apresentacao}) ---------- Dar/Administrar <strong>${volTexto}</strong> ${freqTexto}.</li>`;
            });
        }

        // Hidratação
        let htmlPlano = '';
        if (!isNaN(peso) && peso > 0) {
            if (chkHolliday && chkHolliday.checked) {
                let volumeTotal = peso <= 10 ? peso * 100 : (peso <= 20 ? 1000 + (peso - 10) * 50 : 1500 + (peso - 20) * 20);
                if (volumeTotal > 2500) volumeTotal = 2500;

                const taxaMlh = volumeTotal / 24;
                const naclMl = (volumeTotal / 100) * 2;
                const kclMl = (volumeTotal / 100) * 1;

                htmlPlano += `
                    <div style="margin-bottom: 12px;">
                        <strong>• Manutenção Hídrica (Holliday-Segar):</strong><br>
                        - Soro Glicosado 5%: ${Math.round(volumeTotal)} mL<br>
                        - NaCl 20%: ${naclMl.toFixed(1)} mL<br>
                        - KCl 19,1%: ${kclMl.toFixed(1)} mL<br>
                        <em>Correr em bomba de infusão na taxa de <strong>${taxaMlh.toFixed(1)} mL/h</strong> em 24 horas.</em>
                    </div>
                `;
            }

            if (chkDengue && chkDengue.checked) {
                const radioSel = document.querySelector('input[name="dengue-grupo"]:checked');
                const grupo = radioSel ? radioSel.value : 'A';
                const orientacao = dengueOrientacaoTexto ? dengueOrientacaoTexto.textContent : '';
                const volTxt = dengueVolumeTotal ? dengueVolumeTotal.textContent : '';

                htmlPlano += `
                    <div>
                        <strong>• Protocolo de Dengue (Grupo ${grupo}):</strong><br>
                        - Volume Calculado: ${volTxt}<br>
                        - Conduta: ${orientacao}
                    </div>
                `;
            }
        }


        if (isPrint) {
            return `
                <div class="print-header">
                    <div class="clinic-info">
                        <h2>${meta.tituloDoc}</h2>
                        <p>${meta.subtituloDoc}</p>
                    </div>
                    <div class="print-date">
                        <strong>Data:</strong> <span>${meta.dataTexto}</span>
                    </div>
                </div>
                <div class="print-patient-box">
                    <div class="patient-row"><span class="item-label">Nome do Paciente:</span> <strong>${meta.nome}</strong></div>
                    <div class="patient-row-inline">
                        <div><span class="item-label">Idade:</span> <strong>${meta.idadeTexto}</strong></div>
                        <div><span class="item-label">Peso:</span> <strong>${meta.pesoTexto}</strong></div>
                    </div>
                </div>
                <div class="print-content-section">
                    <h3>USO MEDICAMENTOSO</h3>
                    <ol class="print-items-list">${medListHtml}</ol>
                </div>
                ${htmlPlano ? `
                <div class="print-content-section">
                    <h3>PLANO DE HIDRATAÇÃO</h3>
                    <div class="print-hydration-box">${htmlPlano}</div>
                </div>` : ''}
                <div class="print-footer-signature">
                    <div class="signature-box">
                        <div class="signature-line-print"></div>
                        <p><strong>${meta.profNomeVal}</strong></p>
                        <p>${meta.profCrmVal}</p>
                    </div>
                </div>
            `;
        } else {
            return `
                <div class="paper-header">
                    <h4>${meta.tituloDoc}</h4>
                    <p>${meta.subtituloDoc}</p>
                </div>
                <div class="paper-patient-info">
                    <div><strong>Paciente:</strong> <span>${meta.nome}</span></div>
                    <div><strong>Idade:</strong> <span>${meta.idadeTexto}</span></div>
                    <div><strong>Peso:</strong> <span>${meta.pesoTexto}</span></div>
                    <div><strong>Data:</strong> <span>${meta.dataTexto}</span></div>
                </div>
                <div class="paper-section">
                    <h5>1. Medicamentos Prescritos</h5>
                    <ol class="prescription-list">${medListHtml}</ol>
                </div>
                ${htmlPlano ? `
                <div class="paper-section">
                    <h5>2. Hidratação & Manejo Hídrico</h5>
                    <div>${htmlPlano}</div>
                </div>` : ''}
                <div class="paper-signature-block">
                    <div class="signature-line"></div>
                    <p class="doctor-name">${meta.profNomeVal}</p>
                    <p class="doctor-crm">${meta.profCrmVal}</p>
                </div>
            `;
        }
    }

    function gerarHtmlExames(isPrint) {
        const meta = gerarHeaderFooterDocumento('SOLICITAÇÃO DE EXAMES PEDIÁTRICOS', 'Serviço de Diagnóstico Pediátrico');

        const examesChecados = [];
        chkExames.forEach(chk => {
            if (chk.checked) examesChecados.push(chk.value);
        });

        const examesAdicionaisVal = elExamesAdicionais ? elExamesAdicionais.value.trim() : '';
        const examesIndicacaoVal = elExamesIndicacao ? elExamesIndicacao.value.trim() : '';

        let examesListHtml = '';
        if (examesChecados.length === 0 && !examesAdicionaisVal) {
            examesListHtml = isPrint ? '<li>Nenhum exame selecionado.</li>' : '<li class="empty-msg">Nenhum exame selecionado na aba Solicitação de Exames.</li>';
        } else {
            examesChecados.forEach(ex => {
                examesListHtml += `<li><strong>Solicito:</strong> ${ex}</li>`;
            });
            if (examesAdicionaisVal) {
                const linhasAdic = examesAdicionaisVal.split('\n').filter(l => l.trim().length > 0);
                linhasAdic.forEach(l => {
                    examesListHtml += `<li><strong>Solicito:</strong> ${l.trim()}</li>`;
                });
            }
        }

        let indicacaoHtml = '';
        if (examesIndicacaoVal) {
            indicacaoHtml = `
                <div class="indicacao-clinica-box" style="margin-top:20px;">
                    <h6>Indicação Clínica / Hipótese Diagnóstica:</h6>
                    <p style="white-space: pre-line;">${examesIndicacaoVal}</p>
                </div>
            `;
        }

        if (isPrint) {
            return `
                <div class="print-header">
                    <div class="clinic-info">
                        <h2>${meta.tituloDoc}</h2>
                        <p>${meta.subtituloDoc}</p>
                    </div>
                    <div class="print-date">
                        <strong>Data:</strong> <span>${meta.dataTexto}</span>
                    </div>
                </div>
                <div class="print-patient-box">
                    <div class="patient-row"><span class="item-label">Nome do Paciente:</span> <strong>${meta.nome}</strong></div>
                    <div class="patient-row-inline">
                        <div><span class="item-label">Idade:</span> <strong>${meta.idadeTexto}</strong></div>
                        <div><span class="item-label">Peso:</span> <strong>${meta.pesoTexto}</strong></div>
                    </div>
                </div>
                <div class="print-content-section">
                    <h3>EXAMES SOLICITADOS</h3>
                    <ul class="print-items-list" style="list-style-type: square;">${examesListHtml}</ul>
                    ${indicacaoHtml}
                </div>
                <div class="print-footer-signature">
                    <div class="signature-box">
                        <div class="signature-line-print"></div>
                        <p><strong>${meta.profNomeVal}</strong></p>
                        <p>${meta.profCrmVal}</p>
                    </div>
                </div>
            `;
        } else {
            return `
                <div class="paper-header">
                    <h4>${meta.tituloDoc}</h4>
                    <p>${meta.subtituloDoc}</p>
                </div>
                <div class="paper-patient-info">
                    <div><strong>Paciente:</strong> <span>${meta.nome}</span></div>
                    <div><strong>Idade:</strong> <span>${meta.idadeTexto}</span></div>
                    <div><strong>Peso:</strong> <span>${meta.pesoTexto}</span></div>
                    <div><strong>Data:</strong> <span>${meta.dataTexto}</span></div>
                </div>
                <div class="paper-section">
                    <h5>Exames Solicitados</h5>
                    <ul class="exames-preview-list">${examesListHtml}</ul>
                    ${indicacaoHtml}
                </div>
                <div class="paper-signature-block">
                    <div class="signature-line"></div>
                    <p class="doctor-name">${meta.profNomeVal}</p>
                    <p class="doctor-crm">${meta.profCrmVal}</p>
                </div>
            `;
        }
    }

    function gerarHtmlAtestado(isPrint) {
        const meta = gerarHeaderFooterDocumento('ATESTADO MÉDICO PEDIÁTRICO', 'Conforme Diretrizes CFM (Resoluções 1.658/2002 e 1.851/2008)');

        const radioSel = document.querySelector('input[name="atestado-finalidade"]:checked');
        const finalidade = radioSel ? radioSel.value : 'repouso';

        const diasVal = parseInt(elAtestadoDias ? elAtestadoDias.value : 1) || 1;
        const diasExtenso = numeroPorExtenso(diasVal);
        const diasTexto = `${diasVal} (${diasExtenso}) ${diasVal === 1 ? 'dia' : 'dias'}`;

        const respVal = elAtestadoResponsavel ? elAtestadoResponsavel.value.trim() : '';

        let textoAtestado = '';
        if (finalidade === 'repouso') {
            textoAtestado = `Atesto, para os devidos fins de direito, que o(a) paciente <strong>${meta.nome}</strong> (${meta.idadeTexto}), esteve sob meus cuidados médicos no dia <strong>${meta.dataTexto}</strong>, necessitando de <strong>${diasTexto}</strong> de repouso e afastamento de suas atividades creche/escolar por motivo de saúde.`;
        } else {
            const respTexto = respVal ? `Sr(a). <strong>${respVal}</strong>` : 'seu responsável legal';
            textoAtestado = `Atesto, para os devidos fins de direito, que ${respTexto} esteve presente acompanhando o(a) paciente pediátrico(a) <strong>${meta.nome}</strong> (${meta.idadeTexto}) sob meus cuidados médicos no dia <strong>${meta.dataTexto}</strong>, necessitando de <strong>${diasTexto}</strong> de afastamento de suas atividades laborais para o referido acompanhamento.`;
        }

        // Regra CFM: Imprimir o CID apenas se este item for checado!
        let cidHtml = '';
        const cidVal = elAtestadoCid ? elAtestadoCid.value.trim() : '';
        if (chkAutorizaCid && chkAutorizaCid.checked && cidVal) {
            cidHtml = `<div class="atestado-cid-tag"><strong>CID-10:</strong> ${cidVal}</div>`;
        }

        if (isPrint) {
            return `
                <div class="print-header">
                    <div class="clinic-info">
                        <h2>${meta.tituloDoc}</h2>
                        <p>${meta.subtituloDoc}</p>
                    </div>
                    <div class="print-date">
                        <strong>Data:</strong> <span>${meta.dataTexto}</span>
                    </div>
                </div>
                <div class="print-patient-box">
                    <div class="patient-row"><span class="item-label">Nome do Paciente:</span> <strong>${meta.nome}</strong></div>
                    <div class="patient-row-inline">
                        <div><span class="item-label">Idade:</span> <strong>${meta.idadeTexto}</strong></div>
                        <div><span class="item-label">Peso:</span> <strong>${meta.pesoTexto}</strong></div>
                    </div>
                </div>
                <div class="print-content-section" style="margin-top: 40px; margin-bottom: 50px;">
                    <p style="font-size: 12pt; line-height: 1.8; text-align: justify; margin-bottom: 20px;">
                        ${textoAtestado}
                    </p>
                    ${cidHtml}
                </div>
                <div class="print-footer-signature">
                    <div class="signature-box">
                        <div class="signature-line-print"></div>
                        <p><strong>${meta.profNomeVal}</strong></p>
                        <p>${meta.profCrmVal}</p>
                    </div>
                </div>
            `;
        } else {
            return `
                <div class="paper-header">
                    <h4>${meta.tituloDoc}</h4>
                    <p>${meta.subtituloDoc}</p>
                </div>
                <div class="paper-patient-info">
                    <div><strong>Paciente:</strong> <span>${meta.nome}</span></div>
                    <div><strong>Idade:</strong> <span>${meta.idadeTexto}</span></div>
                    <div><strong>Peso:</strong> <span>${meta.pesoTexto}</span></div>
                    <div><strong>Data:</strong> <span>${meta.dataTexto}</span></div>
                </div>
                <div class="paper-section">
                    <div class="atestado-preview-text">
                        ${textoAtestado}
                    </div>
                    ${cidHtml}
                </div>
                <div class="paper-signature-block" style="margin-top: 50px;">
                    <div class="signature-line"></div>
                    <p class="doctor-name">${meta.profNomeVal}</p>
                    <p class="doctor-crm">${meta.profCrmVal}</p>
                </div>
            `;
        }
    }

    function atualizarDocumentoPreview() {
        if (!previewPaperContainer || !secaoImpressao) return;

        let htmlPreview = '';
        let htmlPrint = '';

        if (documentoTipoAtivo === 'receita') {
            htmlPreview = gerarHtmlReceita(false);
            htmlPrint = gerarHtmlReceita(true);
        } else if (documentoTipoAtivo === 'exames') {
            htmlPreview = gerarHtmlExames(false);
            htmlPrint = gerarHtmlExames(true);
        } else if (documentoTipoAtivo === 'atestado') {
            htmlPreview = gerarHtmlAtestado(false);
            htmlPrint = gerarHtmlAtestado(true);
        }

        previewPaperContainer.innerHTML = htmlPreview;
        secaoImpressao.innerHTML = htmlPrint;
    }

    // -------------------------------------------------------------------------
    // PERSISTÊNCIA (Fase 1) — autosave em localStorage + perfil do profissional
    // Duas chaves separadas:
    //  - 'prescmed:profissional': nome/CRM do médico (mesmo médico todo atendimento;
    //    sobrevive a "Novo Paciente" e "Limpar Seleção").
    //  - 'prescmed:atendimento': dados do paciente + seleções + aba/tipo de documento
    //    (zerado em "Novo Paciente").
    // -------------------------------------------------------------------------
    const STORAGE_PROF = 'prescmed:profissional';
    const STORAGE_ATEND = 'prescmed:atendimento';

    function persistirPerfilProfissional() {
        try {
            const nome = elProfNome ? elProfNome.value.trim() : '';
            const crm = elProfCrm ? elProfCrm.value.trim() : '';
            if (!nome && !crm) return; // não sobrescreve um perfil salvo com valores vazios
            localStorage.setItem(STORAGE_PROF, JSON.stringify({ nome, crm }));
        } catch (e) { /* localStorage indisponível (modo privado) */ }
    }

    function coletarEstadoAtendimento() {
        return {
            paciente: {
                nome: elNome ? elNome.value : '',
                idade: elIdade ? elIdade.value : '',
                idadeUnidade: elIdadeUnidade ? elIdadeUnidade.value : 'anos',
                peso: elPeso ? elPeso.value : '',
                data: elData ? elData.value : ''
            },
            modoPrescricao,
            medicamentosSelecionados: [...document.querySelectorAll('.med-checkbox:checked')].map(c => c.getAttribute('data-med-id')),
            opcoesSelecionadas: (() => {
                const o = {};
                document.querySelectorAll('.med-option-select').forEach(s => { o[s.getAttribute('data-med-id')] = s.value; });
                return o;
            })(),
            porPeso: [...porPesoMeds],
            hidratacao: {
                holliday: !!(chkHolliday && chkHolliday.checked),
                dengue: !!(chkDengue && chkDengue.checked),
                dengueGrupo: (document.querySelector('input[name="dengue-grupo"]:checked') || {}).value || 'A'
            },
            exames: {
                checados: [...chkExames].filter(c => c.checked).map(c => c.id),
                adicionais: elExamesAdicionais ? elExamesAdicionais.value : '',
                indicacao: elExamesIndicacao ? elExamesIndicacao.value : ''
            },
            atestado: {
                finalidade: (document.querySelector('input[name="atestado-finalidade"]:checked') || {}).value || 'repouso',
                dias: elAtestadoDias ? elAtestadoDias.value : '1',
                responsavel: elAtestadoResponsavel ? elAtestadoResponsavel.value : '',
                cid: elAtestadoCid ? elAtestadoCid.value : '',
                autorizaCid: !!(chkAutorizaCid && chkAutorizaCid.checked)
            },
            abaAtiva: (document.querySelector('.tab-btn.active') || {}).getAttribute ? document.querySelector('.tab-btn.active').getAttribute('data-tab') : 'medicamentos',
            documentoTipo: documentoTipoAtivo
        };
    }

    function estadoEstaVazio(e) {
        const temPaciente = !!(e.paciente.nome || e.paciente.idade || e.paciente.peso);
        const temMeds = e.medicamentosSelecionados.length > 0;
        const temHid = e.hidratacao.holliday || e.hidratacao.dengue;
        const temExames = e.exames.checados.length > 0 || !!(e.exames.adicionais || e.exames.indicacao);
        const temAtestado = !!(e.atestado.responsavel || e.atestado.cid || e.atestado.autorizaCid) || (parseInt(e.atestado.dias) || 1) !== 1;
        return !(temPaciente || temMeds || temHid || temExames || temAtestado);
    }

    let _saveTimer = null;
    function agendarSalvamento() {
        clearTimeout(_saveTimer);
        _saveTimer = setTimeout(() => {
            try {
                const estado = coletarEstadoAtendimento();
                if (estadoEstaVazio(estado)) {
                    localStorage.removeItem(STORAGE_ATEND); // não guarda atendimento em branco
                } else {
                    localStorage.setItem(STORAGE_ATEND, JSON.stringify(estado));
                }
                persistirPerfilProfissional();
            } catch (e) { /* localStorage indisponível */ }
        }, 500);
    }

    function restaurarEstado() {
        // 1) Perfil do profissional (sempre restaura, mesmo sem atendimento salvo)
        try {
            const profRaw = localStorage.getItem(STORAGE_PROF);
            if (profRaw) {
                const prof = JSON.parse(profRaw);
                if (elProfNome && prof.nome) elProfNome.value = prof.nome;
                if (elProfCrm && prof.crm) elProfCrm.value = prof.crm;
            }
        } catch (e) { /* ignora */ }

        // 2) Atendimento (paciente + seleções + aba)
        let atend = null;
        try {
            const raw = localStorage.getItem(STORAGE_ATEND);
            if (raw) atend = JSON.parse(raw);
        } catch (e) { atend = null; }
        if (!atend) return false;

        try {
            if (atend.paciente) {
                if (elNome) elNome.value = atend.paciente.nome || '';
                if (elIdade) elIdade.value = atend.paciente.idade || '';
                if (elIdadeUnidade) elIdadeUnidade.value = atend.paciente.idadeUnidade || 'anos';
                if (elPeso) elPeso.value = atend.paciente.peso || '';
                if (elData && atend.paciente.data) elData.value = atend.paciente.data;
            }

            if (atend.modoPrescricao === 'adulto' || atend.modoPrescricao === 'ped') {
                modoPrescricao = atend.modoPrescricao;
                const radio = document.querySelector(`input[name="modo-prescricao"][value="${modoPrescricao}"]`);
                if (radio) radio.checked = true;
                document.body.classList.toggle('modo-adulto', modoPrescricao === 'adulto');
            }

            if (Array.isArray(atend.porPeso)) atend.porPeso.forEach(id => porPesoMeds.add(id));

            if (atend.hidratacao) {
                if (chkHolliday) chkHolliday.checked = !!atend.hidratacao.holliday;
                if (chkDengue) chkDengue.checked = !!atend.hidratacao.dengue;
                if (atend.hidratacao.dengueGrupo) {
                    const g = document.querySelector(`input[name="dengue-grupo"][value="${atend.hidratacao.dengueGrupo}"]`);
                    if (g) g.checked = true;
                }
            }

            if (atend.exames) {
                (atend.exames.checados || []).forEach(id => {
                    const c = document.getElementById(id);
                    if (c) c.checked = true;
                });
                if (elExamesAdicionais) elExamesAdicionais.value = atend.exames.adicionais || '';
                if (elExamesIndicacao) elExamesIndicacao.value = atend.exames.indicacao || '';
            }

            if (atend.atestado) {
                const fin = document.querySelector(`input[name="atestado-finalidade"][value="${atend.atestado.finalidade}"]`);
                if (fin) fin.checked = true;
                if (elAtestadoDias) elAtestadoDias.value = atend.atestado.dias || '1';
                if (elAtestadoResponsavel) elAtestadoResponsavel.value = atend.atestado.responsavel || '';
                if (elAtestadoCid) elAtestadoCid.value = atend.atestado.cid || '';
                if (chkAutorizaCid) chkAutorizaCid.checked = !!atend.atestado.autorizaCid;
            }

            // Recria os cards e reaplica as seleções/regimes por medicamento
            reRenderPreservandoSelecao();
            (atend.medicamentosSelecionados || []).forEach(id => {
                const chk = document.getElementById(`chk-med-${id}`);
                if (chk) {
                    chk.checked = true;
                    const card = document.getElementById(`card-med-${id}`);
                    if (card) card.classList.add('selected');
                }
            });
            Object.entries(atend.opcoesSelecionadas || {}).forEach(([id, val]) => {
                const sel = document.getElementById(`sel-op-${id}`);
                if (sel) sel.value = val;
            });

            // Recalcula os blocos de hidratação conforme o que foi restaurado
            if (chkHolliday && chkHolliday.checked) recalcularTudo();
            if (chkDengue && chkDengue.checked) calcularDengue();
            atualizarVisibilidadeResponsavel();
            recalcularTudo();
            atualizarDocumentoPreview();

            // Aba + tipo de documento ativos (aba via hash tem prioridade, tratada na inicialização)
            if (atend.documentoTipo) setTipoDocumentoAtivo(atend.documentoTipo);
            return true;
        } catch (e) {
            return false;
        }
    }

    // Salva automaticamente a cada interação relevante (debounce via agendarSalvamento)
    document.addEventListener('input', agendarSalvamento);
    document.addEventListener('change', agendarSalvamento);
    document.addEventListener('aba:alterada', agendarSalvamento);
    document.addEventListener('documento:alterado', agendarSalvamento);
    document.addEventListener('atendimento:limpar', () => {
        clearTimeout(_saveTimer);
        try { localStorage.removeItem(STORAGE_ATEND); } catch (e) { /* ignora */ }
    });

    // Aviso ao sair/recarregar somente se houver dados relevantes preenchidos (Fase 1.2)
    window.addEventListener('beforeunload', (e) => {
        try {
            if (!estadoEstaVazio(coletarEstadoAtendimento())) {
                e.preventDefault();
                e.returnValue = '';
            }
        } catch (err) { /* ignora */ }
    });
});
