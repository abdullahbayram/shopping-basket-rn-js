import { Alert } from 'react-native';
import showToast from './showToast';

jest.mock('react-native', () => ({
  Alert: {
    alert: jest.fn(),
  },
}));

describe('showToast', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should call Alert.alert with default values when no arguments are passed', () => {
    showToast();

    expect(Alert.alert).toHaveBeenCalledWith('Notice', 'Something happened');
  });

  it('should call Alert.alert with provided title and message', () => {
    const title = 'Custom Title';
    const message = 'Custom Message';

    showToast({ title, message });

    expect(Alert.alert).toHaveBeenCalledWith(title, message);
  });

  it('should call Alert.alert with default title when only message is provided', () => {
    const message = 'Only Message';

    showToast({ message });

    expect(Alert.alert).toHaveBeenCalledWith('Notice', message);
  });

  it('should call Alert.alert with default message when only title is provided', () => {
    const title = 'Only Title';

    showToast({ title });

    expect(Alert.alert).toHaveBeenCalledWith(title, 'Something happened');
  });

  it('should not call Alert.alert and log an error when both title and message are empty', () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

    showToast({ title: '', message: '' });

    expect(Alert.alert).not.toHaveBeenCalled();
    expect(consoleSpy).toHaveBeenCalledWith('Invalid input: title and message cannot both be empty');

    consoleSpy.mockRestore();
  });
});
