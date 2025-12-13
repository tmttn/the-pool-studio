import robots from '../../app/robots';

describe('robots', () => {
  it('returns correct robots configuration', () => {
    const result = robots();

    expect(result).toEqual({
      rules: {
        userAgent: '*',
        allow: '/',
      },
      sitemap: 'https://www.thepool-studio.be/sitemap.xml',
    });
  });
});
