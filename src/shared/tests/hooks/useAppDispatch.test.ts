import { useDispatch } from 'react-redux';

import useAppDispatch from '@/shared/hooks/useAppDispatch';

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
}));

describe('useAppDispatch', () => {
  const mockedUseDispatch = useDispatch as jest.MockedFunction<
    typeof useDispatch
  >;

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should call useDispatch', () => {
    useAppDispatch();

    expect(mockedUseDispatch).toHaveBeenCalledTimes(1);
  });

  it('should return the result of useDispatch', () => {
    const dispatchMock = jest.fn();
    mockedUseDispatch.mockReturnValueOnce(dispatchMock);

    const result = useAppDispatch();

    expect(result).toBe(dispatchMock);
  });
});
