import { Content } from './content';

describe('Notification Content', () => {
  it('should be able to create a new notification content', () => {
    const content = new Content('This is a valid content');

    expect(content).toEqual({ content: 'This is a valid content' });
  });

  it('should no be able to create a new notification content with less than 5 characters', () => {
    expect(() => new Content('Abc')).toThrow();
  });

  it('should no be able to create a new notification content with more than 240 characters', () => {
    expect(() => new Content('a'.repeat(241))).toThrow();
  });
});
