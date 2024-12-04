import { format } from 'date-fns';

// Formatar data no formato DD/MM/AAAA - HH:MM
export function formatarData(data) {
  try {
    return format(new Date(data), 'dd/MM/yyyy - HH:mm');
  } catch (error) {
    console.error('Erro ao formatar a data:', error);
    return 'Data inválida';
  }
}