from tsetmc import _get_par_tree, _read_html


def boards() -> dict[int, str]:
    # Also, available at http://en.tsetmc.com/Loader.aspx?ParTree=121C1913.
    iloc = _read_html(_get_par_tree('111C1913'), header=0)[0].iloc
    return dict(zip(iloc[:, 0], iloc[:, 1]))


def cs_codes() -> dict[str, str]:
    iloc = _read_html(_get_par_tree('111C1213'), header=0)[0].iloc
    return dict(zip(iloc[:, 0], iloc[:, 1]))
