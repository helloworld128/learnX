import {by, element, expect} from 'detox';
import {dummyPassword, dummyUsername} from '../src/constants/Dummy';

const loginScreenDescription = () => {
  it('should have a screen', async () => {
    await expect(element(by.id('LoginScreen'))).toBeVisible();
  });

  it('should accept username input', async () => {
    await element(by.id('UsernameTextField'))
      .atIndex(0)
      .typeText(dummyUsername);
    await expect(element(by.id('UsernameTextField')).atIndex(0)).toHaveText(
      dummyUsername,
    );
  });

  it('should accept password input', async () => {
    await element(by.id('PasswordTextField'))
      .atIndex(0)
      .typeText(dummyPassword);
    await expect(element(by.id('PasswordTextField')).atIndex(0)).toHaveText(
      dummyPassword,
    );
  });

  it('should login after click button', async () => {
    await element(by.id('LoginButton'))
      .atIndex(0)
      .tap();
  });
};

export default loginScreenDescription;
