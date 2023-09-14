export const helpersMixin = {
  methods: {
    amountFormat(amount) {
      return new Intl.NumberFormat('en-BD', {
          // style: 'currency',
          // currency: 'USD',
          minimumFractionDigits: 0,
      }).format(amount);
    }
  }
}
