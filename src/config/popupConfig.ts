import { PopupProps } from 'reactjs-popup/dist/types'

export const popupConfig: Omit<PopupProps, 'children'> = {
  position: 'bottom left',
  keepTooltipInside: true,
  closeOnDocumentClick: true,
  repositionOnResize: true,
  contentStyle: {
    marginLeft: '-4px',
    marginTop: '-8px',
    background: 'transparent',
    border: 0,
    boxShadow: 'none'
  },
  arrow: false,
  on: 'click',
  nested: true
}
