/**
 * Calculadora Médica Pediátrica - Lógica JS Completa
 * Suporte a dosagens por peso, limites de teto máximo, Holliday-Segar e Manejo de Dengue.
 * Matriz Completa de Medicações (SBP / Ministério da Saúde).
 */

document.addEventListener('DOMContentLoaded', () => {
    // -------------------------------------------------------------------------
    // BASE DE DADOS COMPLETA DOS MEDICAMENTOS PEDIÁTRICOS
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
            posologiaStd: '10 a 15 mg/kg/dose (6/6h ou 4/4h se febre/dor)',
            doseMgKg: 15,
            concentracaoMgMl: 200,
            gotasPorMl: 20,
            tetoDoseMg: 1000,
            tetoDiaMg: 4000,
            frequencia: 'de 6 em 6 horas se febre (T >= 37.8°C) ou dor',
            unidadeDosagem: 'gotas'
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
            unidadeDosagem: 'mL'
        },
        {
            id: 'ibuprofeno_gotas_50',
            categoria: 'sintomaticos',
            categoriaNome: '1. Sintomáticos e Antieméticos',
            nome: 'Ibuprofeno Gotas 50 mg/mL',
            apresentacao: '50 mg/mL (1 mL = 20 gotas | 1 gota = 2,5 mg)',
            posologiaStd: '10 mg/kg/dose (8/8h ou 6/6h)',
            doseMgKg: 10,
            concentracaoMgMl: 50,
            gotasPorMl: 20,
            tetoDoseMg: 400,
            tetoDiaMg: 2400,
            frequencia: 'de 8 em 8 horas se febre ou dor',
            unidadeDosagem: 'gotas'
        },
        {
            id: 'ibuprofeno_gotas_100',
            categoria: 'sintomaticos',
            categoriaNome: '1. Sintomáticos e Antieméticos',
            nome: 'Ibuprofeno Gotas 100 mg/mL',
            apresentacao: '100 mg/mL (1 mL = 20 gotas | 1 gota = 5 mg)',
            posologiaStd: '10 mg/kg/dose (8/8h ou 6/6h)',
            doseMgKg: 10,
            concentracaoMgMl: 100,
            gotasPorMl: 20,
            tetoDoseMg: 400,
            tetoDiaMg: 2400,
            frequencia: 'de 8 em 8 horas se febre ou dor',
            unidadeDosagem: 'gotas'
        },
        {
            id: 'ibuprofeno_susp_30',
            categoria: 'sintomaticos',
            categoriaNome: '1. Sintomáticos e Antieméticos',
            nome: 'Ibuprofeno Suspensão 30 mg/mL',
            apresentacao: '30 mg/mL (100 mg / 5 mL ~ 20 mg/mL sol. oral)',
            posologiaStd: '10 mg/kg/dose (8/8h ou 6/6h)',
            doseMgKg: 10,
            concentracaoMgMl: 30,
            tetoDoseMg: 400,
            tetoDiaMg: 2400,
            frequencia: 'de 8 em 8 horas se febre ou dor',
            unidadeDosagem: 'mL'
        },
        {
            id: 'ibuprofeno_susp_50',
            categoria: 'sintomaticos',
            categoriaNome: '1. Sintomáticos e Antieméticos',
            nome: 'Ibuprofeno Suspensão 50 mg/mL',
            apresentacao: '50 mg/mL (200 mg / 5 mL)',
            posologiaStd: '10 mg/kg/dose (8/8h ou 6/6h)',
            doseMgKg: 10,
            concentracaoMgMl: 50,
            tetoDoseMg: 400,
            tetoDiaMg: 2400,
            frequencia: 'de 8 em 8 horas se febre ou dor',
            unidadeDosagem: 'mL'
        },
        {
            id: 'dipirona_gotas',
            categoria: 'sintomaticos',
            categoriaNome: '1. Sintomáticos e Antieméticos',
            nome: 'Dipirona Gotas 500 mg/mL',
            apresentacao: '500 mg/mL (1 mL = 20 gotas | 1 gota = 25 mg)',
            posologiaStd: '10 a 15 mg/kg/dose (6/6h ou 8/8h)',
            doseMgKg: 15,
            concentracaoMgMl: 500,
            gotasPorMl: 20,
            tetoDoseMg: 1000,
            tetoDiaMg: 4000,
            frequencia: 'de 6 em 6 horas se febre (T >= 37.8°C) ou dor',
            unidadeDosagem: 'gotas'
        },
        {
            id: 'dipirona_sol_oral',
            categoria: 'sintomaticos',
            categoriaNome: '1. Sintomáticos e Antieméticos',
            nome: 'Dipirona Solução Oral 50 mg/mL',
            apresentacao: '50 mg/mL (250 mg / 5 mL)',
            posologiaStd: '10 a 15 mg/kg/dose (6/6h ou 8/8h)',
            doseMgKg: 15,
            concentracaoMgMl: 50,
            tetoDoseMg: 1000,
            tetoDiaMg: 4000,
            frequencia: 'de 6 em 6 horas se febre ou dor',
            unidadeDosagem: 'mL'
        },
        {
            id: 'ondansetrona_sol',
            categoria: 'sintomaticos',
            categoriaNome: '1. Sintomáticos e Antieméticos',
            nome: 'Ondansetrona Solução Oral',
            apresentacao: '0,8 mg/mL (4 mg / 5 mL)',
            posologiaStd: '0,15 mg/kg/dose (8/8h se náuseas ou vômitos)',
            doseMgKg: 0.15,
            concentracaoMgMl: 0.8,
            tetoDoseMg: 8,
            tetoDiaMg: 24,
            frequencia: 'de 8 em 8 horas em caso de náuseas ou vômitos',
            unidadeDosagem: 'mL'
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
            unidadeDosagem: 'gotas'
        },
        {
            id: 'ondansetrona_comp',
            categoria: 'sintomaticos',
            categoriaNome: '1. Sintomáticos e Antieméticos',
            nome: 'Ondansetrona Comprimido (4 mg / 8 mg)',
            apresentacao: 'Comprimido 4 mg e 8 mg (desintegração oral)',
            posologiaStd: '<15kg: 2-4 mg | 15-30kg: 4 mg | >30kg: 8 mg',
            doseMgKg: 0.15,
            tetoDoseMg: 8,
            frequencia: 'de 8 em 8 horas se náuseas ou vômitos',
            unidadeDosagem: 'comprimido',
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
                return { doseMg, volumeTexto: desc, tetoAtingido: false };
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
            unidadeDosagem: 'mL'
        },
        {
            id: 'bromoprida_gotas',
            categoria: 'sintomaticos',
            categoriaNome: '1. Sintomáticos e Antieméticos',
            nome: 'Bromoprida Gotas 4 mg/mL',
            apresentacao: '4 mg/mL (1 mL = 20 gotas | 1 gota = 0,2 mg)',
            posologiaStd: '0,15 mg/kg/dose (8/8h)',
            doseMgKg: 0.15,
            concentracaoMgMl: 4,
            gotasPorMl: 20,
            tetoDoseMg: 10,
            tetoDiaMg: 30,
            frequencia: 'de 8 em 8 horas 30 min antes das refeições',
            unidadeDosagem: 'gotas'
        },
        {
            id: 'bromoprida_sol_oral',
            categoria: 'sintomaticos',
            categoriaNome: '1. Sintomáticos e Antieméticos',
            nome: 'Bromoprida Solução Oral 1 mg/mL',
            apresentacao: '1 mg/mL',
            posologiaStd: '0,15 mg/kg/dose (8/8h)',
            doseMgKg: 0.15,
            concentracaoMgMl: 1,
            tetoDoseMg: 10,
            tetoDiaMg: 30,
            frequencia: 'de 8 em 8 horas 30 min antes das refeições',
            unidadeDosagem: 'mL'
        },
        {
            id: 'simeticona_gotas',
            categoria: 'sintomaticos',
            categoriaNome: '1. Sintomáticos e Antieméticos',
            nome: 'Simeticona Gotas 75 mg/mL',
            apresentacao: '75 mg/mL (1 mL = 20 a 30 gotas ~ 3,75 mg/gota)',
            posologiaStd: 'Lactentes (<2 anos): 20 mg | Crianças (>2 anos): 40 mg',
            doseMgKg: 0,
            concentracaoMgMl: 75,
            gotasPorMl: 20,
            tetoDoseMg: 40,
            frequencia: 'de 8 em 8 horas após as refeições se cólica/gases',
            unidadeDosagem: 'gotas',
            calculoEspecial: (peso, idadeNum, idadeUnidade) => {
                let idadeMeses = idadeNum;
                if (idadeUnidade === 'anos') idadeMeses = idadeNum * 12;

                let doseMg = 40;
                let gotas = 12;
                let ml = 0.53;
                let faixaTexto = 'Criança >= 2 anos';

                if (!isNaN(idadeMeses) && idadeMeses < 24) {
                    doseMg = 20;
                    gotas = 6;
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
            posologiaStd: '0,04 mg/kg/dose (8/8h ou 6/6h)',
            doseMgKg: 0.04,
            concentracaoMgMl: 2,
            gotasPorMl: 20,
            tetoDoseMg: 2,
            tetoDiaMg: 6,
            frequencia: 'de 8 em 8 horas se sintomas alérgicos',
            unidadeDosagem: 'gotas'
        },
        {
            id: 'dexclorfeniramina_xarope',
            categoria: 'sintomaticos',
            categoriaNome: '1. Sintomáticos e Antieméticos',
            nome: 'Dexclorfeniramina Xarope',
            apresentacao: '0,4 mg/mL (2 mg / 5 mL)',
            posologiaStd: '0,04 mg/kg/dose (8/8h ou 6/6h)',
            doseMgKg: 0.04,
            concentracaoMgMl: 0.4,
            tetoDoseMg: 2,
            tetoDiaMg: 6,
            frequencia: 'de 8 em 8 horas se sintomas alérgicos',
            unidadeDosagem: 'mL'
        },
        {
            id: 'desloratadina_xarope',
            categoria: 'sintomaticos',
            categoriaNome: '1. Sintomáticos e Antieméticos',
            nome: 'Desloratadina Xarope',
            apresentacao: '0,5 mg/mL (0,5 mg/mL)',
            posologiaStd: 'Dose fixa por faixa etária (1x ao dia)',
            doseMgKg: 0,
            tetoDoseMg: 5,
            frequencia: 'uma vez ao dia (24/24h)',
            unidadeDosagem: 'mL',
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

        // =====================================================================
        // 2. CORTICOIDES E BRONCODILATADORES
        // =====================================================================
        {
            id: 'prednisolona_1mg',
            categoria: 'corticoides',
            categoriaNome: '2. Corticoides e Broncodilatadores',
            nome: 'Prednisolona Solução Oral 1 mg/mL',
            apresentacao: '1 mg/mL',
            posologiaStd: '1 a 2 mg/kg/dia em dose única matinal (3 a 5 dias)',
            doseMgKg: 1,
            concentracaoMgMl: 1,
            tetoDoseMg: 60,
            tetoDiaMg: 60,
            frequencia: 'uma vez ao dia pela manhã por 3 a 5 dias',
            unidadeDosagem: 'mL'
        },
        {
            id: 'prednisolona_3mg',
            categoria: 'corticoides',
            categoriaNome: '2. Corticoides e Broncodilatadores',
            nome: 'Prednisolona Solução Oral 3 mg/mL',
            apresentacao: '3 mg/mL (3 mg / mL)',
            posologiaStd: '1 a 2 mg/kg/dia em dose única matinal (3 a 5 dias)',
            doseMgKg: 1,
            concentracaoMgMl: 3,
            tetoDoseMg: 60,
            tetoDiaMg: 60,
            frequencia: 'uma vez ao dia pela manhã por 3 a 5 dias',
            unidadeDosagem: 'mL'
        },
        {
            id: 'dexametasona_elixir',
            categoria: 'corticoides',
            categoriaNome: '2. Corticoides e Broncodilatadores',
            nome: 'Dexametasona Elixir 0,1 mg/mL',
            apresentacao: '0,1 mg/mL (0,5 mg / 5 mL)',
            posologiaStd: 'Crupe: 0,6 mg/kg dose única | Anti-inflamatório: 0,15 mg/kg/dia',
            opcoes: [
                { id: 'crupe', nome: 'Regra Crupe (Dose Única 0,6 mg/kg)', doseMgKg: 0.6, teto: 16, freq: 'dose única no atendimento' },
                { id: 'habitual', nome: 'Habitual Anti-inflamatório (0,15 mg/kg/dia)', doseMgKg: 0.05, teto: 10, freq: 'de 8 em 8 horas' }
            ],
            frequencia: 'dose única no atendimento',
            unidadeDosagem: 'mL',
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
            categoriaNome: '2. Corticoides e Broncodilatadores',
            nome: 'Dexametasona Ampola EV/IM',
            apresentacao: '4 mg/mL (Ampola de 1 mL ou 2,5 mL = 10 mg)',
            posologiaStd: 'Crupe: 0,6 mg/kg EV/IM dose única | Habitual: 0,15 mg/kg/dia EV/IM',
            opcoes: [
                { id: 'crupe', nome: 'Regra Crupe (0,6 mg/kg EV/IM Dose Única)', doseMgKg: 0.6, teto: 16, freq: 'via IM ou EV em dose única' },
                { id: 'habitual', nome: 'Habitual EV/IM (0,15 mg/kg/dia)', doseMgKg: 0.05, teto: 10, freq: 'de 8 em 8 horas via EV ou IM' }
            ],
            frequencia: 'via IM ou EV em dose única',
            unidadeDosagem: 'mL',
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
            categoriaNome: '2. Corticoides e Broncodilatadores',
            nome: 'Hidrocortisona Frasco-Ampola',
            apresentacao: 'Frasco-ampola 100 mg e 500 mg (EV)',
            posologiaStd: 'Ataque: 4 a 8 mg/kg EV | Manutenção: 2 a 4 mg/kg EV (6/6h)',
            opcoes: [
                { id: 'ataque', nome: 'Dose de Ataque (8 mg/kg EV)', doseMgKg: 8, teto: 500, freq: 'em dose única por via EV rápida' },
                { id: 'manutencao', nome: 'Dose de Manutenção (4 mg/kg EV)', doseMgKg: 4, teto: 250, freq: 'de 6 em 6 horas por via EV' }
            ],
            frequencia: 'por via EV',
            unidadeDosagem: 'mg',
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
            categoriaNome: '2. Corticoides e Broncodilatadores',
            nome: 'Salbutamol Solução para Nebulização',
            apresentacao: '5 mg/mL (0,5% | 1 mL = 20 gotas | 1 gota = 0,25 mg)',
            posologiaStd: '0,05 a 0,15 mg/kg/dose (1 gota a cada 2-3 kg | Mín. 5 got | Máx 20 got)',
            doseMgKg: 0.1,
            tetoDoseMg: 5,
            frequencia: 'diluído em 3 a 5 mL de SF 0,9% em nebulização a cada 20 min (crise) ou 6/6h',
            unidadeDosagem: 'gotas',
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
            categoriaNome: '2. Corticoides e Broncodilatadores',
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

        // =====================================================================
        // 3. ANTIBIÓTICOS ORAIS
        // =====================================================================
        {
            id: 'amoxicilina_250',
            categoria: 'orais',
            categoriaNome: '3. Antibióticos Orais',
            nome: 'Amoxicilina Suspensão 250 mg/5 mL',
            apresentacao: '250 mg / 5 mL (50 mg/mL)',
            posologiaStd: 'Habitual: 50 mg/kg/dia (8/8h) | Alta Dose: 80-90 mg/kg/dia (12/12h)',
            opcoes: [
                { id: 'habitual', nome: 'Dose Habitual (50 mg/kg/dia em 8/8h)', doseMgKg: 16.67, teto: 500, freq: 'de 8 em 8 horas por 7 a 10 dias' },
                { id: 'alta_dose', nome: 'Alta Dose / OMA (90 mg/kg/dia em 12/12h)', doseMgKg: 45, teto: 1000, freq: 'de 12 em 12 horas por 7 a 10 dias' }
            ],
            frequencia: 'de 8 em 8 horas por 7 a 10 dias',
            unidadeDosagem: 'mL',
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
            categoriaNome: '3. Antibióticos Orais',
            nome: 'Amoxicilina Suspensão 400 mg/5 mL',
            apresentacao: '400 mg / 5 mL (80 mg/mL)',
            posologiaStd: 'Habitual: 50 mg/kg/dia (12/12h) | Alta Dose: 80-90 mg/kg/dia (12/12h)',
            opcoes: [
                { id: 'habitual', nome: 'Dose Habitual (50 mg/kg/dia em 12/12h)', doseMgKg: 25, teto: 500, freq: 'de 12 em 12 horas por 7 a 10 dias' },
                { id: 'alta_dose', nome: 'Alta Dose / OMA (90 mg/kg/dia em 12/12h)', doseMgKg: 45, teto: 1000, freq: 'de 12 em 12 horas por 7 a 10 dias' }
            ],
            frequencia: 'de 12 em 12 horas por 7 a 10 dias',
            unidadeDosagem: 'mL',
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
            id: 'amoxicilina_clav_250',
            categoria: 'orais',
            categoriaNome: '3. Antibióticos Orais',
            nome: 'Amoxicilina + Clavulanato 250+62,5 mg/5 mL',
            apresentacao: '250 mg + 62,5 mg / 5 mL (50 mg/mL de Amoxicilina)',
            posologiaStd: '40 a 50 mg/kg/dia de amoxicilina divididos em 8/8h',
            doseMgKg: 15,
            concentracaoMgMl: 50,
            tetoDoseMg: 500,
            tetoDiaMg: 1500,
            frequencia: 'de 8 em 8 horas por 7 a 10 dias',
            unidadeDosagem: 'mL'
        },
        {
            id: 'amoxicilina_clav_400',
            categoria: 'orais',
            categoriaNome: '3. Antibióticos Orais',
            nome: 'Amoxicilina + Clavulanato 400+57 mg/5 mL',
            apresentacao: '400 mg + 57 mg / 5 mL (80 mg/mL de Amoxicilina)',
            posologiaStd: '45 a 90 mg/kg/dia de amoxicilina divididos em 12/12h',
            doseMgKg: 22.5,
            concentracaoMgMl: 80,
            tetoDoseMg: 875,
            tetoDiaMg: 1750,
            frequencia: 'de 12 em 12 horas por 7 a 10 dias',
            unidadeDosagem: 'mL'
        },
        {
            id: 'cefalexina_susp',
            categoria: 'orais',
            categoriaNome: '3. Antibióticos Orais',
            nome: 'Cefalexina Suspensão 250 mg/5 mL',
            apresentacao: '250 mg / 5 mL (50 mg/mL)',
            posologiaStd: '50 mg/kg/dia divididos em 4 doses (6/6h)',
            doseMgKg: 12.5,
            concentracaoMgMl: 50,
            tetoDoseMg: 500,
            tetoDiaMg: 2000,
            frequencia: 'de 6 em 6 horas por 7 a 10 dias',
            unidadeDosagem: 'mL'
        },
        {
            id: 'cefuroxima_susp',
            categoria: 'orais',
            categoriaNome: '3. Antibióticos Orais',
            nome: 'Cefuroxima Axetil Suspensão 250 mg/5 mL',
            apresentacao: '250 mg / 5 mL (50 mg/mL)',
            posologiaStd: '30 mg/kg/dia divididos em 2 doses (12/12h)',
            doseMgKg: 15,
            concentracaoMgMl: 50,
            tetoDoseMg: 500,
            tetoDiaMg: 1000,
            frequencia: 'de 12 em 12 horas junto às refeições por 10 dias',
            unidadeDosagem: 'mL'
        },
        {
            id: 'azitromicina_susp',
            categoria: 'orais',
            categoriaNome: '3. Antibióticos Orais',
            nome: 'Azitromicina Suspensão 200 mg/5 mL',
            apresentacao: '200 mg / 5 mL (40 mg/mL)',
            posologiaStd: '10 mg/kg/dia em dose única (24/24h) por 3 a 5 dias',
            doseMgKg: 10,
            concentracaoMgMl: 40,
            tetoDoseMg: 500,
            tetoDiaMg: 500,
            frequencia: 'uma vez ao dia por 3 a 5 dias',
            unidadeDosagem: 'mL'
        },
        {
            id: 'smx_tmp_susp',
            categoria: 'orais',
            categoriaNome: '3. Antibióticos Orais',
            nome: 'Sulfametoxazol + Trimetoprima (SMX+TMP)',
            apresentacao: '200 mg + 40 mg / 5 mL (40 mg/mL SMX | 8 mg/mL TMP)',
            posologiaStd: '40 mg/kg/dia SMX / 8 mg/kg/dia TMP (12/12h)',
            doseMgKg: 20,
            concentracaoMgMl: 40,
            tetoDoseMg: 800,
            tetoDiaMg: 1600,
            frequencia: 'de 12 em 12 horas por 7 a 10 dias',
            unidadeDosagem: 'mL'
        },
        {
            id: 'metronidazol_susp',
            categoria: 'orais',
            categoriaNome: '3. Antibióticos Orais',
            nome: 'Metronidazol Suspensão Oral',
            apresentacao: '40 mg/mL (200 mg / 5 mL)',
            posologiaStd: '30 a 40 mg/kg/dia divididos em 3 doses (8/8h)',
            doseMgKg: 10,
            concentracaoMgMl: 40,
            tetoDoseMg: 500,
            tetoDiaMg: 1500,
            frequencia: 'de 8 em 8 horas por 7 a 10 dias',
            unidadeDosagem: 'mL'
        },
        {
            id: 'clindamicina_comp',
            categoria: 'orais',
            categoriaNome: '3. Antibióticos Orais',
            nome: 'Clindamicina Comprimido / Cápsula 300 mg',
            apresentacao: 'Cápsula de 300 mg',
            posologiaStd: '20 a 30 mg/kg/dia divididos em 3 a 4 doses (6/6h ou 8/8h)',
            doseMgKg: 7.5,
            tetoDoseMg: 600,
            frequencia: 'de 6 em 6 horas por 7 a 10 dias',
            unidadeDosagem: 'cápsula',
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

        // =====================================================================
        // 4. ANTIBIÓTICOS PARENTERAIS (EV / IM)
        // =====================================================================
        {
            id: 'ceftriaxona_ev',
            categoria: 'parenterais',
            categoriaNome: '4. Antibióticos Parenterais (EV/IM)',
            nome: 'Ceftriaxona Frasco-Ampola 500 mg / 1000 mg',
            apresentacao: 'Frasco-ampola 500 mg e 1000 mg (1g)',
            posologiaStd: 'Infecção Habitual: 50-75 mg/kg/dia (24/24h) | Meningite: 100 mg/kg/dia',
            opcoes: [
                { id: 'habitual', nome: 'Infecção Habitual (75 mg/kg/dia 24/24h)', doseMgKg: 75, teto: 2000, freq: 'uma vez ao dia por via EV ou IM' },
                { id: 'meningite', nome: 'Meningite / Infecção Grave (100 mg/kg/dia em 12/12h)', doseMgKg: 50, teto: 2000, freq: 'de 12 em 12 horas por via EV' }
            ],
            frequencia: 'uma vez ao dia por via EV ou IM',
            unidadeDosagem: 'mL',
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
            categoriaNome: '4. Antibióticos Parenterais (EV/IM)',
            nome: 'Ampicilina Frasco-Ampola 500 mg / 1000 mg',
            apresentacao: 'Frasco-ampola 500 mg e 1000 mg (EV/IM)',
            posologiaStd: '100 a 200 mg/kg/dia divididos em 4 doses (6/6h)',
            doseMgKg: 37.5,
            tetoDoseMg: 2000,
            frequencia: 'de 6 em 6 horas por via EV em 15-30 min',
            unidadeDosagem: 'mg',
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
            categoriaNome: '4. Antibióticos Parenterais (EV/IM)',
            nome: 'Oxacilina Frasco-Ampola 500 mg',
            apresentacao: 'Frasco-ampola 500 mg (EV)',
            posologiaStd: '100 a 200 mg/kg/dia divididos em 4 a 6 doses (6/6h ou 4/4h)',
            doseMgKg: 37.5,
            tetoDoseMg: 2000,
            frequencia: 'de 6 em 6 horas por via EV lenta',
            unidadeDosagem: 'mg',
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
            categoriaNome: '4. Antibióticos Parenterais (EV/IM)',
            nome: 'Cefuroxima Parenteral Frasco-Ampola 750 mg',
            apresentacao: 'Frasco-ampola 750 mg (EV/IM)',
            posologiaStd: '75 a 150 mg/kg/dia divididos em 3 doses (8/8h)',
            doseMgKg: 33.3,
            tetoDoseMg: 1500,
            frequencia: 'de 8 em 8 horas por via EV em 15-30 min',
            unidadeDosagem: 'mg',
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
            categoriaNome: '4. Antibióticos Parenterais (EV/IM)',
            nome: 'Cefalotina Frasco-Ampola 1000 mg (1g)',
            apresentacao: 'Frasco-ampola 1g (EV/IM)',
            posologiaStd: '80 a 160 mg/kg/dia divididos em 4 doses (6/6h)',
            doseMgKg: 25,
            tetoDoseMg: 2000,
            frequencia: 'de 6 em 6 horas por via EV',
            unidadeDosagem: 'mg',
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
            id: 'clindamicina_ampola',
            categoria: 'parenterais',
            categoriaNome: '4. Antibióticos Parenterais (EV/IM)',
            nome: 'Clindamicina Ampola EV/IM 150 mg/mL',
            apresentacao: '150 mg/mL (Ampola de 4 mL = 600 mg)',
            posologiaStd: '20 a 40 mg/kg/dia divididos em 3 a 4 doses (6/6h ou 8/8h)',
            doseMgKg: 10,
            concentracaoMgMl: 150,
            tetoDoseMg: 600,
            tetoDiaMg: 2400,
            frequencia: 'de 6 em 6 horas por via EV infusão em 30 min',
            unidadeDosagem: 'mL'
        },
        {
            id: 'vancomicina_ev',
            categoria: 'parenterais',
            categoriaNome: '4. Antibióticos Parenterais (EV/IM)',
            nome: 'Vancomicina Frasco-Ampola 500 mg',
            apresentacao: 'Frasco-ampola 500 mg (EV)',
            posologiaStd: '40 a 60 mg/kg/dia divididos em 4 doses (6/6h em infusão de 60 min)',
            doseMgKg: 12.5,
            tetoDoseMg: 1000,
            frequencia: 'de 6 em 6 horas por via EV infusão lenta (60 min)',
            unidadeDosagem: 'mg',
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
            categoriaNome: '4. Antibióticos Parenterais (EV/IM)',
            nome: 'Gentamicina Ampolas (20 mg/mL, 40 mg/mL e 80 mg/2 mL)',
            apresentacao: 'Ampolas de 20 mg/mL, 40 mg/mL e 80 mg/2 mL (40 mg/mL)',
            posologiaStd: '5 a 7,5 mg/kg/dia em dose única diária (24/24h)',
            doseMgKg: 5,
            concentracaoMgMl: 40,
            tetoDoseMg: 240,
            tetoDiaMg: 240,
            frequencia: 'uma vez ao dia por via EV (infusão 30 min) ou IM',
            unidadeDosagem: 'mL'
        },
        {
            id: 'amicacina_ampola',
            categoria: 'parenterais',
            categoriaNome: '4. Antibióticos Parenterais (EV/IM)',
            nome: 'Amicacina Ampolas (100 mg, 250 mg e 500 mg)',
            apresentacao: 'Ampolas de 100 mg / 2 mL, 250 mg / 2 mL e 500 mg / 2 mL',
            posologiaStd: '15 a 20 mg/kg/dia em dose única diária (24/24h)',
            doseMgKg: 15,
            concentracaoMgMl: 250,
            tetoDoseMg: 1500,
            tetoDiaMg: 1500,
            frequencia: 'uma vez ao dia por via EV ou IM',
            unidadeDosagem: 'mL'
        },
        {
            id: 'metronidazol_ev',
            categoria: 'parenterais',
            categoriaNome: '4. Antibióticos Parenterais (EV/IM)',
            nome: 'Metronidazol Bolsa EV 5 mg/mL',
            apresentacao: '5 mg/mL (Bolsa de 100 mL = 500 mg)',
            posologiaStd: '30 mg/kg/dia divididos em 3 doses (8/8h em infusão de 30-60 min)',
            doseMgKg: 10,
            concentracaoMgMl: 5,
            tetoDoseMg: 500,
            tetoDiaMg: 1500,
            frequencia: 'de 8 em 8 horas por via EV infusão em 30 a 60 min',
            unidadeDosagem: 'mL'
        },

        // =====================================================================
        // 5. ADRENALINA, SUPLEMENTAÇÃO E PROFILAXIA
        // =====================================================================
        {
            id: 'adrenalina_ampola',
            categoria: 'suplementos',
            categoriaNome: '5. Adrenalina, Suplementação e Profilaxia',
            nome: 'Adrenalina / Epinefrina Ampola 1 mg/mL',
            apresentacao: '1 mg/mL (1:1.000)',
            posologiaStd: 'Anafilaxia IM (1:1.000) | PCR EV/IO (1:10.000) | Crupe Nebulização',
            opcoes: [
                { id: 'anafilaxia', nome: 'Anafilaxia (IM 1:1.000 pura 0,01 mg/kg)', doseMgKg: 0.01, teto: 0.3, freq: 'via IM na face anterolateral da coxa' },
                { id: 'pcr', nome: 'PCR / Parada (EV/IO 1:10.000 0,1 mL/kg)', doseMgKg: 0.01, teto: 1, freq: 'via EV/IO rápida a cada 3-5 min' },
                { id: 'crupe', nome: 'Crupe Nebulização (1:1.000 pura 0,5 mL/kg)', doseMgKg: 0.5, teto: 5, freq: 'via nebulização pura ou com SF 0,9%' }
            ],
            frequencia: 'via IM na face anterolateral da coxa',
            unidadeDosagem: 'mL',
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
                    if (doseMg > 0.3) {
                        doseMg = 0.3;
                        tetoAtingido = true;
                    }
                    const ml = doseMg / 1;
                    return {
                        doseMg,
                        volumeTexto: `${ml.toFixed(2)} mL (${(ml * 20).toFixed(0)} gotas) de Adrenalina 1:1.000 IM`,
                        tetoAtingido
                    };
                }
            }
        },
        {
            id: 'vitamina_d',
            categoria: 'suplementos',
            categoriaNome: '5. Adrenalina, Suplementação e Profilaxia',
            nome: 'Vitamina D (Diretrizes SBP)',
            apresentacao: 'Solução Gotas (200 UI / gota ou 400 UI / gota)',
            posologiaStd: 'Termo: 400 UI/dia (1º ano) | Prematuro: 400 a 800 UI/dia',
            opcoes: [
                { id: 'termo_1ano', nome: 'RN a Termo (400 UI/dia até 12 meses)', ui: 400, freq: 'uma vez ao dia' },
                { id: 'termo_2ano', nome: 'RN a Termo (600 UI/dia no 2º ano de vida)', ui: 600, freq: 'uma vez ao dia' },
                { id: 'prematuro', nome: 'RN Prematuro (400 a 800 UI/dia)', ui: 800, freq: 'uma vez ao dia' }
            ],
            frequencia: 'uma vez ao dia',
            unidadeDosagem: 'gotas',
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
            categoriaNome: '5. Adrenalina, Suplementação e Profilaxia',
            nome: 'Ferro Elementar Gotas (Suplementação / Tratamento)',
            apresentacao: 'Solução 25 mg/mL de Ferro Elementar (1 mL = 20 gotas | 1 gota = 1,25 mg)',
            posologiaStd: 'Profilaxia SBP: 1 a 4 mg/kg/dia | Tratamento Anemia: 3 a 6 mg/kg/dia',
            opcoes: [
                { id: 'termo_aig', nome: 'Profilaxia: RN Termo AIG (1 mg/kg/dia a partir dos 6m)', mgKg: 1 },
                { id: 'termo_pbp', nome: 'Profilaxia: RN Termo Peso Baixo <2500g (2 mg/kg/dia a partir de 30 dias)', mgKg: 2 },
                { id: 'prem_1500', nome: 'Profilaxia: Prematuro 1000g a 1500g (3 mg/kg/dia a partir de 30 dias)', mgKg: 3 },
                { id: 'prem_1000', nome: 'Profilaxia: Prematuro <1000g (4 mg/kg/dia a partir de 30 dias)', mgKg: 4 },
                { id: 'tratamento', nome: 'Tratamento: Anemia Ferropriva Confirmada (4 mg/kg/dia)', mgKg: 4 }
            ],
            frequencia: 'uma vez ao dia (ou divididos em 2 tomadas) 30 min antes das refeições',
            unidadeDosagem: 'gotas',
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
        }
    ];

    // -------------------------------------------------------------------------
    // ELEMENTOS DO DOM
    // -------------------------------------------------------------------------
    const elNome = document.getElementById('paciente-nome');
    const elIdade = document.getElementById('paciente-idade');
    const elIdadeUnidade = document.getElementById('paciente-idade-unidade');
    const elPeso = document.getElementById('paciente-peso');
    const elData = document.getElementById('paciente-data');
    const elProfNome = document.getElementById('profissional-nome');
    const elProfCrm = document.getElementById('profissional-crm');

    const weightStatusDisplay = document.getElementById('weight-status-display');
    const gridMedicamentos = document.getElementById('grid-medicamentos');
    const categoryFilterBtns = document.querySelectorAll('.cat-btn');

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
    const btnLimparPrescricao = document.getElementById('btn-limpar-prescricao');
    const btnNovoPaciente = document.getElementById('btn-novo-paciente');
    const btnNovoPacienteTop = document.getElementById('btn-novo-paciente-top');

    let categoriaFiltroAtiva = 'todos';
    let documentoTipoAtivo = 'receita'; // 'receita' | 'exames' | 'atestado'

    // -------------------------------------------------------------------------
    // INICIALIZAÇÃO DA DATA ATUAL E RENDERIZAÇÃO INICIAL
    // -------------------------------------------------------------------------
    const hoje = new Date();
    const dataFormatada = hoje.toLocaleDateString('pt-BR');
    elData.value = dataFormatada;

    // Renderizar os cards de medicamentos vazios
    renderizarCardsMedicamentos();
    atualizarDocumentoPreview();

    // Eventos para atualização em tempo real
    elPeso.addEventListener('input', recalcularTudo);
    elNome.addEventListener('input', () => {
        recalcularTudo();
        atualizarDocumentoPreview();
    });
    elIdade.addEventListener('input', recalcularTudo);
    elIdadeUnidade.addEventListener('change', recalcularTudo);
    if (elProfNome) elProfNome.addEventListener('input', atualizarDocumentoPreview);
    if (elProfCrm) elProfCrm.addEventListener('input', atualizarDocumentoPreview);

    chkHolliday.addEventListener('change', atualizarDocumentoPreview);
    chkDengue.addEventListener('change', atualizarDocumentoPreview);

    radioDengueGrupos.forEach(radio => {
        radio.addEventListener('change', () => {
            calcularDengue();
            atualizarDocumentoPreview();
        });
    });

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
    }

    function ativarAbaDocumento(docType) {
        setTipoDocumentoAtivo(docType);

        // Ativar aba Exportador no DOM
        const tabBtns = document.querySelectorAll('.tab-btn');
        const tabPanels = document.querySelectorAll('.tab-panel');

        tabBtns.forEach(b => b.classList.remove('active'));
        tabPanels.forEach(p => p.classList.remove('active'));

        const targetBtn = document.querySelector('.tab-btn[data-tab="exportador"]');
        const targetPanel = document.getElementById('painel-exportador');

        if (targetBtn) targetBtn.classList.add('active');
        if (targetPanel) targetPanel.classList.add('active');
    }

    btnImprimir.addEventListener('click', () => {
        atualizarDocumentoPreview();
        window.print();
    });

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

        atualizarVisibilidadeResponsavel();
        atualizarDocumentoPreview();
    }

    function novoPacienteReset() {
        if (elNome) elNome.value = '';
        if (elIdade) elIdade.value = '';
        if (elIdadeUnidade) elIdadeUnidade.value = 'anos';
        if (elPeso) elPeso.value = '';
        if (elProfNome) elProfNome.value = '';
        if (elProfCrm) elProfCrm.value = '';

        limparPrescricao();
        recalcularTudo();
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
            filtrarCardsPorCategoria();
        });
    });

    // Controle de Abas Principal
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanels = document.querySelectorAll('.tab-panel');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            tabBtns.forEach(b => b.classList.remove('active'));
            tabPanels.forEach(p => p.classList.remove('active'));

            btn.classList.add('active');
            const targetTab = btn.getAttribute('data-tab');
            const targetPanel = document.getElementById(`painel-${targetTab}`);
            if (targetPanel) targetPanel.classList.add('active');
        });
    });

    // -------------------------------------------------------------------------
    // FUNÇÕES DE RENDERIZAÇÃO E CÁLCULO
    // -------------------------------------------------------------------------

    function renderizarCardsMedicamentos() {
        gridMedicamentos.innerHTML = '';

        medicamentos.forEach(med => {
            const card = document.createElement('article');
            card.className = 'med-card';
            card.id = `card-med-${med.id}`;
            card.setAttribute('data-categoria', med.categoria);

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
                </div>

                <div class="med-calc-box">
                    <div class="calc-row">
                        <span class="label">Posologia Recomendada:</span>
                        <span class="value">${med.posologiaStd}</span>
                    </div>
                    <div class="calc-row">
                        <span class="label">Dose Calculada:</span>
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
                    }
                });
            }
        });

        filtrarCardsPorCategoria();
    }

    function filtrarCardsPorCategoria() {
        const cards = gridMedicamentos.querySelectorAll('.med-card');
        cards.forEach(card => {
            const cat = card.getAttribute('data-categoria');
            if (categoriaFiltroAtiva === 'todos' || cat === categoriaFiltroAtiva) {
                card.style.display = 'flex';
            } else {
                card.style.display = 'none';
            }
        });
    }

    function recalcularTudo() {
        const peso = parseFloat(elPeso.value);

        if (isNaN(peso) || peso <= 0) {
            weightStatusDisplay.textContent = 'Insira um peso válido';
            weightStatusDisplay.classList.remove('ready');
            limparResultados();
            return;
        }

        weightStatusDisplay.textContent = `Peso ativo: ${peso.toFixed(1)} kg`;
        weightStatusDisplay.classList.add('ready');

        // Recalcular Medicamentos
        calcularMedicamentos(peso);

        // Recalcular Hidratação Holliday-Segar
        calcularHollidaySegar(peso);

        // Recalcular Dengue
        calcularDengue(peso);

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

        hsVolumeTotal.textContent = '0 mL/dia';
        hsTaxaMlh.textContent = '0 mL/h';
        hsGotejamento.textContent = '0 got/min';
        hsSG.textContent = '0 mL';
        hsNaCl.textContent = '0 mL';
        hsKCl.textContent = '0 mL';

        dengueVolumeTotal.textContent = '0 mL/dia';
        dengueSroVol.textContent = '0 mL';
        dengueLiquidosVol.textContent = '0 mL';

        atualizarDocumentoPreview();
    }

    function calcularMedicamentos(peso) {
        const idadeNum = parseFloat(elIdade.value);
        const idadeUnidade = elIdadeUnidade.value;

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

        hsVolumeTotal.textContent = `${Math.round(volumeTotal)} mL/dia`;
        hsTaxaMlh.textContent = `${taxaMlh.toFixed(1)} mL/h`;
        hsGotejamento.textContent = `${gotejamentoGotas.toFixed(1)} got/min (${Math.round(taxaMlh)} mcg/min)`;

        hsSG.textContent = `${Math.round(volumeTotal)} mL`;
        hsNaCl.textContent = `${naclMl.toFixed(1)} mL`;
        hsKCl.textContent = `${kclMl.toFixed(1)} mL`;
    }

    function calcularDengue(pesoParam) {
        const peso = pesoParam || parseFloat(elPeso.value);
        const radioSel = document.querySelector('input[name="dengue-grupo"]:checked');
        const grupo = radioSel ? radioSel.value : 'A';

        if (isNaN(peso) || peso <= 0) return;

        let volTotal = 0;
        let sro = 0;
        let liquidos = 0;
        let orientacao = '';

        if (grupo === 'A') {
            dengueTituloGrupo.textContent = 'Grupo A - Hidratação Oral Domiciliar';
            volTotal = peso * 60;
            sro = volTotal * (1 / 3);
            liquidos = volTotal * (2 / 3);
            orientacao = 'Administrar 60 mL/kg/dia VO. Oferecer 1/3 em SRO e 2/3 em água, sucos e chás de forma contínua.';
        } else if (grupo === 'B') {
            dengueTituloGrupo.textContent = 'Grupo B - Hidratação Oral Supervisionada';
            volTotal = peso * 80;
            sro = volTotal * (1 / 3);
            liquidos = volTotal * (2 / 3);
            orientacao = 'Administrar 80 mL/kg/dia VO sob observação no serviço de saúde até resultado de exames laboratoriais.';
        } else if (grupo === 'C') {
            dengueTituloGrupo.textContent = 'Grupo C - Expansão Venosa de Emergência';
            volTotal = peso * 10;
            sro = 0;
            liquidos = volTotal;
            orientacao = `Fase de Expansão EV: 10 mL/kg/h nas primeiras 2 horas (${volTotal.toFixed(0)} mL/h em Soro Fisiológico 0.9% ou Ringer Lactato). Reavaliar paciente a cada 2 horas.`;
        } else if (grupo === 'D') {
            dengueTituloGrupo.textContent = 'Grupo D - Expansão Venosa Rápida em Choque';
            volTotal = peso * 20;
            sro = 0;
            liquidos = volTotal;
            orientacao = `Fase de Expansão Rápida EV em emergência: 20 mL/kg em 20 minutos (${volTotal.toFixed(0)} mL em 20 min). Repetir até 3 vezes se necessário. Encaminhar para UTI Pediátrica.`;
        }

        dengueVolumeTotal.textContent = `${Math.round(volTotal)} ${grupo === 'C' || grupo === 'D' ? 'mL (Fase Inicial)' : 'mL/dia'}`;
        dengueSroVol.textContent = sro > 0 ? `${Math.round(sro)} mL (1/3)` : 'N/A (Fase EV)';
        dengueLiquidosVol.textContent = liquidos > 0 ? `${Math.round(liquidos)} mL ${sro > 0 ? '(2/3)' : ''}` : 'N/A';
        dengueOrientacaoTexto.textContent = orientacao;
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
        const nome = elNome.value.trim() || 'Paciente Não Identificado';
        const idadeVal = elIdade.value.trim();
        const unidade = elIdadeUnidade.value;
        const idadeTexto = idadeVal ? `${idadeVal} ${unidade}` : '--';
        const pesoVal = parseFloat(elPeso.value);
        const pesoTexto = !isNaN(pesoVal) ? `${pesoVal.toFixed(1)} kg` : '--';
        const dataTexto = elData.value || new Date().toLocaleDateString('pt-BR');

        const profNomeVal = elProfNome ? elProfNome.value.trim() : '';
        const profCrmVal = elProfCrm ? elProfCrm.value.trim() : '';

        let profHtml = '';
        if (profNomeVal) profHtml += `<p class="print-prof-name"><strong>${profNomeVal}</strong></p>`;
        if (profCrmVal) profHtml += `<p class="print-prof-details">${profCrmVal}</p>`;

        return {
            nome, idadeTexto, pesoTexto, dataTexto, profHtml, tituloDoc, subtituloDoc
        };
    }

    function gerarHtmlReceita(isPrint) {
        const meta = gerarHeaderFooterDocumento('PRESCRIÇÃO MÉDICA PEDIÁTRICA', 'Atendimento Especializado Pediátrico');
        const peso = parseFloat(elPeso.value);

        // Medicamentos
        const medSelecionados = [];
        document.querySelectorAll('.med-checkbox:checked').forEach(chk => {
            const medId = chk.getAttribute('data-med-id');
            const med = medicamentos.find(m => m.id === medId);
            if (med) medSelecionados.push(med);
        });

        let medListHtml = '';
        if (medSelecionados.length === 0) {
            medListHtml = isPrint ? '<li>Sem prescrição medicamentosa.</li>' : '<li class="empty-msg">Nenhum medicamento selecionado.</li>';
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
            if (chkHolliday.checked) {
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

            if (chkDengue.checked) {
                const radioSel = document.querySelector('input[name="dengue-grupo"]:checked');
                const grupo = radioSel ? radioSel.value : 'A';
                const orientacao = dengueOrientacaoTexto.textContent;
                const volTxt = dengueVolumeTotal.textContent;

                htmlPlano += `
                    <div>
                        <strong>• Protocolo de Dengue (Grupo ${grupo}):</strong><br>
                        - Volume Calculado: ${volTxt}<br>
                        - Conduta: ${orientacao}
                    </div>
                `;
            }
        }

        if (!htmlPlano) {
            htmlPlano = isPrint ? '<p>Sem plano de hidratação selecionado.</p>' : '<p class="empty-msg">Nenhum esquema de hidratação selecionado.</p>';
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
                <div class="print-content-section">
                    <h3>PLANO DE HIDRATAÇÃO</h3>
                    <div class="print-hydration-box">${htmlPlano}</div>
                </div>
                <div class="print-footer-signature">
                    <div class="signature-box">
                        <div class="print-prof-info" style="${meta.profHtml ? '' : 'display:none;'}">${meta.profHtml}</div>
                        <div class="signature-line-print"></div>
                        <p><strong>Assinatura e Carimbo do Profissional</strong></p>
                        <p>CRM / Registro Médico</p>
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
                <div class="paper-section">
                    <h5>2. Hidratação & Manejo Hídrico</h5>
                    <div>${htmlPlano}</div>
                </div>
                <div class="paper-signature-block">
                    <div class="paper-prof-info" style="${meta.profHtml ? '' : 'display:none;'}">${meta.profHtml}</div>
                    <div class="signature-line"></div>
                    <p class="doctor-name">Assinatura e Carimbo do Profissional</p>
                    <p class="doctor-crm">CRM / Registro Profissional</p>
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
            examesListHtml = isPrint ? '<li>Nenhum exame selecionado.</li>' : '<li class="empty-msg">Nenhum exame selecionado.</li>';
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
                        <div class="print-prof-info" style="${meta.profHtml ? '' : 'display:none;'}">${meta.profHtml}</div>
                        <div class="signature-line-print"></div>
                        <p><strong>Assinatura e Carimbo do Profissional</strong></p>
                        <p>CRM / Registro Médico</p>
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
                    <div class="paper-prof-info" style="${meta.profHtml ? '' : 'display:none;'}">${meta.profHtml}</div>
                    <div class="signature-line"></div>
                    <p class="doctor-name">Assinatura e Carimbo do Profissional</p>
                    <p class="doctor-crm">CRM / Registro Profissional</p>
                </div>
            `;
        }
    }

    function gerarHtmlAtestado(isPrint) {
        const meta = gerarHeaderFooterDocumento('ATESTADO MÉDICO PEDIÁTRICO', 'Conforme Diretrizes CFM (Resoluções 1.658/2002 e 1.851/2008)');

        const radioSel = document.querySelector('input[name="atestado-finalidade"]:checked');
        const finalidade = radioSel ? radioSel.value : 'repouso';

        const diasVal = parseInt(elAtestadoDias.value) || 1;
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
                        <div class="print-prof-info" style="${meta.profHtml ? '' : 'display:none;'}">${meta.profHtml}</div>
                        <div class="signature-line-print"></div>
                        <p><strong>Assinatura e Carimbo do Profissional</strong></p>
                        <p>CRM / Registro Médico</p>
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
                    <div class="paper-prof-info" style="${meta.profHtml ? '' : 'display:none;'}">${meta.profHtml}</div>
                    <div class="signature-line"></div>
                    <p class="doctor-name">Assinatura e Carimbo do Profissional</p>
                    <p class="doctor-crm">CRM / Registro Profissional</p>
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
});
