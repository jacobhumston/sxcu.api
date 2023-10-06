// A simple getter/setter class.
export class GetterSetter {
    /** Value of this instance. */
    #value = null;
    /** Get the value of this instance. */
    get() {
        return this.#value;
    }
    /**
     * Set the value of this instance.
     * @param value Value to set.
     */
    set(value) {
        this.#value = value;
    }
}
