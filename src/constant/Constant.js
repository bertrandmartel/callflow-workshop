/**
 * Default diagram input
 * @type {String}
 */
export const defaultDiagramInput = `Title: Here is a title
A->B: Normal line
B-->C: Dashed line
C->>D: Open arrow
D-->>A: Dashed open arrow
`;

/**
 * Default diagram options
 * @type {String}
 */
export const defaultDiagramTheme = 'simple';

/**
 * Default editor theme
 * @type {String}
 */
export const defaultAceTheme = 'github';

/**
 * Default window alignment
 * @type {String}
 */
export const defaultConfigView = 'vertical';

/**
 * window size option
 * @type {Object}
 */
export const defaultWindowSizeOption = {
  vertical : {
    width : 500
  },
  horizontal : {
    height: 250
  }
};

export const defaultTitle = 'Sequence Diagram Draft';
