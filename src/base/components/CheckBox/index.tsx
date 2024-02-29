import { FormControlLabel, Checkbox as MuiCheckBox, SxProps } from '@mui/material';

import SpanLang from '@base/components/SpanLang';

interface CheckboxProps {
  label?: string;
  labelPlacement?: 'start' | 'end' | 'top' | 'bottom' | undefined;
  value: boolean;
  onChange?: (val: boolean) => void;
  disabled?: boolean;
  sx?: SxProps;
}

const Checkbox = ({ label, labelPlacement, value, onChange, disabled = false, sx }: CheckboxProps) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange && onChange(event.target.checked);
  };

  return (
    <FormControlLabel
      sx={{ ml: 0, ...sx }}
      control={<MuiCheckBox checked={value} onChange={handleChange} />}
      label={<SpanLang keyLang={label ?? ''} textOnly />}
      labelPlacement={labelPlacement}
      disabled={disabled}
    />
  );
};

export default Checkbox;
