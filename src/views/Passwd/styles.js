import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  box: {
    flex: 1,
  },
  container: {
    padding: 30,
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    backgroundColor: '#fff',
  },
  formLine: {
    marginBottom: 20,
    width: '100%',
  },
  btnAddBox: {
    width: '100%',
  },
  btnList: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
    width: '100%',
  },
  flexBox: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
});

export default styles;
