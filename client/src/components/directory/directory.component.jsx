import React from 'react';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';

import MenuItem from '../menu-item/menu-item.component';
import {selectDirectorySections} from '../../redux/directory/direectory.selector';

import './directory.styles.scss';

const Directory = ({sections})=>{
  
    return (
      <div className="directory-menu">
        {
          sections.map(({id, ...otherSectionalProps}) => {
            return (
              <MenuItem key={id} {...otherSectionalProps} />
            );
          })
        }
      </div>
    );
  }
  


const mapStateToProps = createStructuredSelector({
  sections: selectDirectorySections
})

export default connect(mapStateToProps)(Directory);