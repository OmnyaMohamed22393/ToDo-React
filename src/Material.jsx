import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Switch from '@mui/material/Switch';
import Collapse from '@mui/material/Collapse';

const label = { inputProps: { 'aria-label': 'Size switch demo' } };

export default function Material() {
    const [checked, setChecked] = React.useState(true);

    return (
        <Container maxWidth="md" style={{ marginTop: '100px' }}>
        <div>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                >
                    <Typography component="span">Accordion 1</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                    malesuada lacus ex, sit amet blandit leo lobortis eget.
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2-content"
                    id="panel2-header"
                >
                    <Typography component="span">Accordion 2</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Switch {...label} defaultChecked size="small" value={checked} onChange={ () => {setChecked((prev) => !prev) }} />
                </AccordionDetails>
            </Accordion>
        </div>

        <Collapse in={checked} collapsedSize={100}>
        <div style={{ height: "400px", background: "#ff8f00" }}>
            <h1>Hello World!</h1>
        </div>
        </Collapse>
        
        </Container>
    );
}
