// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts-upgradeable/utils/introspection/ERC165Upgradeable.sol";
import "../royalties/contracts/LibRoyaltiesV2.sol";
import "../royalties/contracts/RoyaltiesV2.sol";

abstract contract RoyaltiesV2Upgradeable is ERC165Upgradeable, RoyaltiesV2 {
    function __RoyaltiesV2Upgradeable_init_unchained() internal initializer {
        supportsInterface(LibRoyaltiesV2._INTERFACE_ID_ROYALTIES);
    }
}
