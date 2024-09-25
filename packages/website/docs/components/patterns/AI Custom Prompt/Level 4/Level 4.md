import html from '!!raw-loader!./sample.html';
import css from '!!raw-loader!./main.css';
import js from '!!raw-loader!./main.js';

### Overview
On top of Level 3, we can now give feedback. Also receive feedback in a Message Strip whether our response is a success, error, or warning. For the sake of the sample those feedback message strips are simulated by the buttons at the top.

<Editor html={html} js={js} css={css} />
