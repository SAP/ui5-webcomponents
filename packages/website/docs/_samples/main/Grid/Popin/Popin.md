import html from '!!raw-loader!./sample.html';
import js from '!!raw-loader!./main.js';

Popin mode is a responsive design feature tailored to adapt column layouts in UI grids or tables, particularly for smaller screens or constrained container widths.

**How It Works:**

When screen space becomes limited, Popin mode seamlessly reorganizes columns. Those that cannot fit within the available width are intelligently relocated to the "popin area," an allocated space designed specifically for accommodating additional columns.

**Default Activation:**

Popin mode is activated by default, ensuring automatic responsiveness without the need for manual intervention.

**Customization Options:**

Users have the flexibility to influence the order of columns appearing in the popin area. This can be achieved by defining the relative importance or priority of each column, allowing for tailored presentation based on specific preferences or usage scenarios.

<Editor html={html} js={js} />
