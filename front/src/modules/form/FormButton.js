import * as React from 'react';
import PropTypes from 'prop-types';

import defer from './defer';
import { Button } from '@mui/material';

function FormButton(props) {
  const { disabled, mounted, ...others } = props;
  return (
    <Button
      disabled={!mounted || !!disabled}
      type="submit"
      variant="contained"
      {...others}
    />
  );
}

FormButton.propTypes = {
  /**
   * If `true`, the component is disabled.
   */
  disabled: PropTypes.bool,
  mounted: PropTypes.bool,
};

export default defer(FormButton);
