import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  box: {
    padding: 0,
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    backgroundColor: '#fff',
  },
  listItem: {
    width: 500,
    height: 90,
    borderBottomColor: '#D4D4D4',
    borderBottomWidth: 1,
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 20,
    paddingRight: 20,
  },

  listItemTitle: {
    color: '#333',
    fontSize: 20,
  },
  listChild: {
    width: '100%',
    height: 90,
    borderBottomColor: '#D4D4D4',
    borderBottomWidth: 1,
    backgroundColor: '#F6F6F6',
  },
  listChildBox: {
    height: 90,
    paddingHorizontal: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  listChildTitle: {
    color: '#333',
    fontSize: 18,
    marginBottom: 4,
  },
  listChildLine: {
    flexDirection: 'row',
    label: {
      width: 60,
      color: '#666',
      fontSize: 14,
    },
    value: {
      color: '#333',
      fontSize: 16,
    },
  },
  fixedAddBox: {
    width: 60,
    height: 60,
    right: 20,
    bottom: 100,
    position: 'absolute',
  },
  fixedAdd: {
    width: 60,
    height: 60,
    backgroundColor: '#E81F63',
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  fixedAddIcon: {
    width: 30,
    height: 30,
  },
});

export default styles;
