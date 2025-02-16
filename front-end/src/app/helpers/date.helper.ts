export function getMonthName(month: string): string {
    const monthNames: { [key: string]: string } = {
      '01': 'Janeiro',
      '02': 'Fevereiro',
      '03': 'Março',
      '04': 'Abril',
      '05': 'Maio',
      '06': 'Junho',
      '07': 'Julho',
      '08': 'Agosto',
      '09': 'Setembro',
      '10': 'Outubro',
      '11': 'Novembro',
      '12': 'Dezembro'
    };
  
    if (month.includes('/')) {
      const [monthPart, yearPart] = month.split('/');
      return monthNames[monthPart as keyof typeof monthNames];
    }
  
    return month;
  }