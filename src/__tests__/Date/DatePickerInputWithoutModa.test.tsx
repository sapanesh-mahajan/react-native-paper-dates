import * as React from 'react'

import renderer from 'react-test-renderer'
import DatePickerInputWithoutModal from '../../Date/DatePickerInputWithoutModal'

it('renders DatePickerInput', () => {
  const tree = renderer
    .create(
      <DatePickerInputWithoutModal
        locale={'en'}
        value={undefined}
        onChange={() => null}
        inputMode="start"
        autoComplete={'birthdate-full'}
      />
    )
    .toJSON()

  expect(tree).toMatchSnapshot()
})
