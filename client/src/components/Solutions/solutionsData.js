import {
  Sun,
  ShieldCheck,
  Clock,
  Car,
  Users,
  BatteryFull,
  Zap,
  TrendingDown,
  Factory,
  CalendarClock,
  Building2,
  Radio,
  Truck,
  Network,
  Home,
  Briefcase,
} from 'lucide-react';

export const categories = [
  {
    id: 'residencial',
    title: 'Energia para a Sua Casa',
    subtitle: 'Soluções residenciais para maximizar poupança e autonomia energética.',
    icon: Home,
    useCases: [
      {
        id: 'autoconsumo-solar',
        name: 'Autoconsumo Solar',
        icon: Sun,
        description:
          'Armazene o excedente da sua produção solar durante o dia e utilize-o à noite, maximizando o retorno do seu investimento fotovoltaico e reduzindo a dependência da rede.',
        benefits: [
          'Aproveitamento de até 100% da energia solar produzida',
          'Redução da fatura elétrica até 100%',
          'Retorno do investimento acelerado',
        ],
        capacity: '5 – 30 kWh',
      },
      {
        id: 'energia-reserva',
        name: 'Energia de Reserva',
        icon: ShieldCheck,
        description:
          'Garanta energia de backup em caso de falha da rede elétrica. A bateria entra em funcionamento automaticamente, mantendo os seus equipamentos essenciais operacionais.',
        benefits: [
          'Transição automática em milissegundos',
          'Proteção de equipamentos sensíveis',
          'Autonomia de horas a dias conforme capacidade',
          'Tranquilidade em zonas com rede instável',
        ],
        capacity: '5 – 30 kWh',
      },
      {
        id: 'arbitragem-tarifaria',
        name: 'Arbitragem Tarifária',
        icon: Clock,
        description:
          'Carregue a bateria nas horas de vazio (tarifa barata) e consuma essa energia nas horas de ponta (tarifa cara), reduzindo significativamente a sua fatura mensal.',
        benefits: [
          'Poupança imediata na fatura de eletricidade',
          'Otimização automática por horários tarifários',
          'Compatível com tarifas bi-horárias e tri-horárias',
          'Compatível com tarifas dinâmicas do mercado'
        ],
        capacity: '5 – 30 kWh',
      },
      {
        id: 'carregamento-ve',
        name: 'Carregamento Inteligente do VE',
        icon: Car,
        description:
          'Carregue o seu veículo elétrico com energia solar e evite picos de consumo .',
        benefits: [
          'Evita reforço de potência contratada',
          'Carregamento com energia solar gratuita'
        ],
        capacity: '15 – 45 kWh',
      },
      {
        id: 'comunidades-energia',
        name: 'Comunidades de Energia',
        icon: Users,
        description:
          'Participe em comunidades de energia renovável e Virtual Power Plants (VPPs), gerando receita passiva ao disponibilizar a capacidade da sua bateria para a rede.',
        benefits: [
          'Receita passiva mensal',
          'Participação em mercados de energia',
          'Contribuição para a estabilidade da rede',
          'Valorização do investimento em bateria',
        ],
        capacity: '10 – 30 kWh',
      },
      {
        id: 'independencia-energetica',
        name: 'Independência Energética',
        icon: BatteryFull,
        description:
          'Maximize a sua autonomia em relação à rede elétrica, combinando produção solar com armazenamento para alcançar níveis de autossuficiência superiores a 90%.',
        benefits: [
          'Autossuficiência energética',
          'Proteção contra aumentos tarifários',
          'Redução da pegada de carbono',
          'Operação em modo off-the-grid',
        ],
        capacity: '20 – 45 kWh',
      },
    ],
  },
  {
    id: 'empresarial',
    title: 'Energia para o Seu Negócio',
    subtitle: 'Soluções industriais e comerciais para eficiência, resiliência e receita.',
    icon: Briefcase,
    useCases: [
      {
        id: 'qualidade-energia',
        name: 'Qualidade de Energia & UPS',
        icon: Zap,
        description:
          'Proteção contra micro-interrupções, afundamentos de tensão e flutuações de frequência que causam paragens de produção, perda de dados e danos em equipamentos sensíveis.',
        benefits: [
          'Resposta em milissegundos (< 10 ms)',
          'Proteção de PLCs, drives e servidores',
          'Eliminação de perdas por paragem não planeada',
          'Conformidade com normas de qualidade de energia',
        ],
        capacity: '50 – 500 kWh',
      },
      {
        id: 'peak-shaving',
        name: 'Peak Shaving & Gestão de Ponta',
        icon: TrendingDown,
        description:
          'Reduza os picos de consumo e a potência contratada, descarregando a bateria nos momentos de maior procura e evitando penalizações por excesso de potência.',
        benefits: [
          'Redução de potência contratada até 30%',
          'Eliminação de penalizações por excesso',
          'Otimização automática baseada em previsões',
          'Poupança significativa em custos fixos de energia',
        ],
        capacity: '50 – 500 kWh',
      },
      {
        id: 'autoconsumo-comercial',
        name: 'Autoconsumo Solar Comercial',
        icon: Factory,
        description:
          'Maximize o retorno do investimento fotovoltaico comercial, armazenando excedentes e consumindo energia solar fora do período de produção, eliminando desperdício.',
        benefits: [
          'Aproveitamento de até 100% da produção solar*',
          'Retorno de investimento acelerado',
          'Escalável conforme crescimento do negócio',
        ],
        capacity: '50 – 500 kWh',
      },
      {
        id: 'deslocamento-cargas',
        name: 'Arbitragem Tarifária',
        icon: CalendarClock,
        description:
          'Mova o consumo energético para horários com tarifas mais baixas, armazenando energia no vazio e utilizando-a durante períodos de ponta e cheia.',
        benefits: [
          'Poupança nos custos variáveis de energia',
          'Automatização total do processo',
          'Compatível com tarifas bi-horárias e tri-horárias',
          'Compatível com tarifas dinâmicas do mercado',
          'Gestão inteligente multi-período',
        ],
        capacity: '50 – 500 kWh',
      },
      {
        id: 'servicos-sistema',
        name: 'Serviços de Sistema',
        icon: Radio,
        description:
          'Gere receita participando em mercados ancilares da rede, disponibilizando capacidade de regulação de frequência e beneficiando de pagamentos regulares.',
        benefits: [
          'Receita adicional via mercados ancilares',
          'Stacking de receitas com outros use cases',
        ],
        capacity: '50 – 500 kWh',
      },
      {
        id: 'microrrede',
        name: 'Microrrede Behind-the-Meter',
        icon: Network,
        description:
          'Crie um ecossistema energético integrado que combina produção renovável, armazenamento, carregamento de VE e gestão de cargas numa plataforma única e otimizada.',
        benefits: [
          'Gestão integrada de todos os ativos energéticos',
          'Operação em modo ilha quando necessário',
          'Otimização multi-objetivo (custo, carbono, resiliência)',
          'Dashboard centralizado com analytics avançados',
        ],
        capacity: '50 – 500 kWh',
      },
    ],
  },
];
