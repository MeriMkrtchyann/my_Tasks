import { Input } from "antd";

function InputSearch (prop) {

    const {setSearchValue} = prop;

    const onSearch = (value) => {
        setSearchValue(value)
    };

    const onChangeValue = (event) => {
      if (!event.target.value) {
        setSearchValue("")
      }
    }

    return (
        <Input.Search
            placeholder="input search text"
            onSearch={onSearch}
            onChange={onChangeValue}
            style={{
              width: 200,
              margin : 25,
            }}
        />
    )
}

export {InputSearch}