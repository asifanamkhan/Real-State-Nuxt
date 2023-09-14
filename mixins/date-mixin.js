export const dateMixin = {
  methods: {
    dateFromat(date) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(date).toLocaleDateString('en', options);
    },
    monthYear(date) {
      const options = { year: 'numeric', month: 'long' };
      return new Date(date).toLocaleDateString('en', options);
    }
  }
}
