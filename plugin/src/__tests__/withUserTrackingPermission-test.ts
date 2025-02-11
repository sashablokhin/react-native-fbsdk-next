import {withUserTrackingPermission} from '../withFacebookIOS';

describe(withUserTrackingPermission, () => {
  it(`skips adding the permission when false`, () => {
    expect(
      withUserTrackingPermission(
        {name: 'foo', slug: 'bar'},
        {iosUserTrackingPermission: false},
      ),
    ).toEqual({
      name: 'foo',
      slug: 'bar',
    });
  });

  it(`sets custom user tracking description`, () => {
    expect(
      withUserTrackingPermission(
        {name: 'foo', slug: 'bar'},
        {iosUserTrackingPermission: 'custom tracking description'},
      ),
    ).toEqual({
      name: 'foo',
      slug: 'bar',
      ios: {
        infoPlist: {
          NSUserTrackingUsageDescription: 'custom tracking description',
        },
      },
    });
  });

  it(`adds default user tracking description`, () => {
    expect(
      withUserTrackingPermission({name: 'foo', slug: 'bar'}, {}),
    ).toStrictEqual({
      name: 'foo',
      slug: 'bar',
      ios: {
        infoPlist: {
          NSUserTrackingUsageDescription:
            'This identifier will be used to deliver personalized ads to you.',
        },
      },
    });
  });

  it(`does not overwrite existing user tracking description`, () => {
    expect(
      withUserTrackingPermission(
        {
          name: 'foo',
          slug: 'bar',
          ios: {
            infoPlist: {
              NSUserTrackingUsageDescription:
                'existing user tracking description',
            },
          },
        },
        {},
      ),
    ).toStrictEqual({
      name: 'foo',
      slug: 'bar',
      ios: {
        infoPlist: {
          NSUserTrackingUsageDescription: 'existing user tracking description',
        },
      },
    });
  });
});
